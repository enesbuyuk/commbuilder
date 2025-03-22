package middleware

import (
	"context"
	"errors"
	"github.com/enesbuyuk/university-student-club-website/pkg/config"
	"github.com/enesbuyuk/university-student-club-website/pkg/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

func JwtMiddleware(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	tokenString := c.Get("Authorization")
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Authorization token is required"})
	}

	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token format"})
	}

	claims, err := config.VerifyToken(tokenString)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	userId := claims["id"].(string)
	username := claims["username"].(string)

	var user models.User
	err = config.DB.Collection("admins").FindOne(ctx, bson.M{"_id": userId, "username": username}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error checking user credentials"})
	}

	user.Password = ""

	c.Locals("user", user)

	return c.Next()
}
