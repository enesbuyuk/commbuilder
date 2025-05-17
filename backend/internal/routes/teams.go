package routes

import (
	"github.com/enesbuyuk/university-student-club-website/internal/handlers"
	"github.com/enesbuyuk/university-student-club-website/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func TeamsRoutes(app *fiber.App) {
	app.Get("/teams", handlers.GetAllPeriods)
	app.Get("/teams/:period", handlers.GetPeriod)
	app.Post("/teams/period", middleware.JwtMiddleware, handlers.CreatePeriod)
	app.Post("/teams/member", middleware.JwtMiddleware, handlers.AddTeamMember)
	app.Put("/teams/member/:id", middleware.JwtMiddleware, handlers.UpdateTeamMember)
	app.Delete("/teams/member/:id", middleware.JwtMiddleware, handlers.DeleteTeamMember)
}
