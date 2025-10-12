package handlers

import (
	"context"
	"errors"
	"time"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/enesbuyuk/commbuildersite/internal/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func GetAuth(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	tokenString := c.Cookies("token")
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Authorization token is required"})
	}

	claims, err := config.VerifyToken(tokenString)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	userId, ok1 := claims["id"].(string)
	username, ok2 := claims["username"].(string)
	if !ok1 || !ok2 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
	}

	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid user ID format"})
	}

	var user models.User
	err = config.DB.Collection("admins").FindOne(ctx, bson.M{"_id": objectId, "username": username}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error checking user credentials"})
	}

	user.Password = ""

	return c.JSON(fiber.Map{
		"message": "Authentication successful",
		"user":    user,
	})
}

func PostAuth(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var request struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	var user models.User
	err := config.DB.Collection("admins").FindOne(ctx, bson.M{"username": request.Username}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid user credentials"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error checking user credentials"})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	token, err := config.CreateToken(user.ID.Hex(), user.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error generating token"})
	}

	return c.JSON(fiber.Map{
		"message": "Authentication successful",
		"token":   token,
	})
}
