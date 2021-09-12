package services

import (
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type jwtService struct {
	secretKey string
	issure    string
}

func NewJWTService() *jwtService {
	return &jwtService{
		secretKey: os.Getenv("JWT_SECRET"),
		issure:    "ms-auth",
	}
}

type Claim struct {
	Id string `json:"id"`
	jwt.StandardClaims
}

func (s *jwtService) GenerateToken(id string) (string, error) {
	claim := &Claim{
		id,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 1).Unix(),
			Issuer:    s.issure,
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)

	t, err := token.SignedString([]byte(s.secretKey))
	if err != nil {
		return "", err
	}

	return t, nil
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

func (s *jwtService) InvalidateToken(token string) bool {
	_, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, isValid := t.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, nil
		}

		s.secretKey = "invalid"

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
// 		id := claims["id"].(string)
// 		val, err := strconv.ParseInt(id, 10, 64)
// 		if err != nil {
// 			return 0, err
// 		}

// 		return val, nil
// 	}

// 	return 0, err
// }