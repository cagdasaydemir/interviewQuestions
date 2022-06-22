package main

import (
	"fmt"
)

func recursiveFunc(x float64) {

	var a, b, c float64 = 78, 818, 764

	ax2 := a * float64(x*x)
	bx := b * float64(x)
	formula := -(ax2 - bx + c) / 140

	fmt.Println(formula)

	if formula < 9 {
		recursiveFunc(float64(formula))
	}

}

func main() {
	
	recursiveFunc(9)
}
