package handlers

import (
	"context"
	"github.com/enesbuyuk/university-student-club-website/pkg/config"
	"github.com/enesbuyuk/university-student-club-website/pkg/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

func GetAllPeriods(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.DB.Collection("teams").Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not fetch data"})
	}
	defer cursor.Close(ctx)

	var periods []models.TeamModel
	if err := cursor.All(ctx, &periods); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Error processing data"})
	}

	return c.JSON(periods)
}

func GetPeriod(c *fiber.Ctx) error {
	period := c.Params("period")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var result models.TeamModel
	err := config.DB.Collection("teams").FindOne(ctx, bson.M{"period": period}).Decode(&result)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Period not found"})
	}

	return c.JSON(result)
}

func CreatePeriod(c *fiber.Ctx) error {
	var period models.TeamModel
	if err := c.BodyParser(&period); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	period.ID = primitive.NewObjectID()

	_, err := config.DB.Collection("teams").InsertOne(ctx, period)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not create period"})
	}

	return c.JSON(period)
}

func AddTeamMember(c *fiber.Ctx) error {
	period := c.Query("period")
	memberType := c.Query("type") // "management" or "auditing"

	var member models.TeamMemberModel
	if err := c.BodyParser(&member); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	member.ID = primitive.NewObjectID()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"period": period}
	update := bson.M{"$push": bson.M{memberType: member}}

	_, err := config.DB.Collection("teams").UpdateOne(ctx, filter, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not add member"})
	}

	return c.JSON(member)
}

func UpdateTeamMember(c *fiber.Ctx) error {
	id := c.Params("id")
	period := c.Query("period")
	memberType := c.Query("type") // "management" or "auditing"

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	var updated models.TeamMemberModel
	if err := c.BodyParser(&updated); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{
		"period":            period,
		memberType + "._id": objID,
	}
	update := bson.M{
		"$set": bson.M{
			memberType + ".$.name":        updated.Name,
			memberType + ".$.position":    updated.Position,
			memberType + ".$.description": updated.Description,
			memberType + ".$.email":       updated.Email,
			memberType + ".$.linkedin":    updated.Linkedin,
		},
	}

	result, err := config.DB.Collection("teams").UpdateOne(ctx, filter, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not update member"})
	}
	if result.MatchedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Member not found"})
	}

	return c.JSON(fiber.Map{"message": "Member updated successfully"})
}

func DeleteTeamMember(c *fiber.Ctx) error {
	id := c.Params("id")
	period := c.Query("period")
	memberType := c.Query("type") // "management" or "auditing"

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"period": period}
	update := bson.M{"$pull": bson.M{memberType: bson.M{"_id": objID}}}

	result, err := config.DB.Collection("teams").UpdateOne(ctx, filter, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not delete member"})
	}
	if result.ModifiedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Member not found"})
	}

	return c.JSON(fiber.Map{"message": "Member deleted successfully"})
}
