package services

import (
	"fmt"
	"os"

	"github.com/dgrijalva/jwt-go"
)

type jwtService struct {
	secretKey string
	issure    string
}

func NewJWTService() *jwtService {
	return &jwtService{
		secretKey: os.Getenv("JWT_SECRET"),
		issure:    "ms-chats",
	}
}

type Claim struct {
	Sum uint `json:"sum"`
	jwt.StandardClaims
}

func (s *jwtService) ValidateToken(token string) bool {
	_, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, isValid := t.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, fmt.Errorf("invalid token: %v", token)
		}

		return []byte(s.secretKey), nil
	})

	return err == nil
}

// func (s *jwtService) GetIDFromToken(t string) (int64, error) {
// 	token, err := jwt.Parse(t, func(token *jwt.Token) (interface{}, error) {
// 		if _, isvalid := token.Method.(*jwt.SigningMethodHMAC); !isvalid {
// 			return nil, fmt.Errorf("invalid Token: %v", t)
// 		}
// 		return []byte(config.GetConfig().JWTSecretKey), nil
// 	})
// 	if err != nil {
// 		return 0, err
// 	}

// 	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
// 		id := claims["sum"].(string)
// 		val, err := strconv.ParseInt(id, 10, 64)
// 		if err != nil {
// 			return 0, err
// 		}

// 		return val, nil
// 	}

// 	return 0, err
// }