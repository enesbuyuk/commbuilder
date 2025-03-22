package services

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
)

func ComparePasswords(hashedPassword, plainPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return false
		}
		return false
	}

	return true
}
