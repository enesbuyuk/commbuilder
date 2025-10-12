package scripts

import (
	"log"
)

func RunAll() {
	log.Println("Running initialization scripts...")
	
	CreateLanguageIndex()
	
	log.Println("All initialization scripts completed")
}
