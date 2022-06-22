package main

import (
	"fmt"
	// "bufio"
	// "log"
	// "os"
	// "strings"
)

// func inputFormatter(input string) []string {

// 	input = strings.ReplaceAll(input, "[", "")
// 	input = strings.ReplaceAll(input, "]", "")
// 	input = strings.ReplaceAll(input, "\"", "")
// 	input = strings.ReplaceAll(input, " ", "")
// 	result := strings.Split(input, ",")

// 	return result
// }

// func userInputReader() []string {

// 	fmt.Println("Enter an Array : ")
// 	scanner := bufio.NewScanner(os.Stdin)
// 	scanner.Scan()
// 	err := scanner.Err()
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	result := inputFormatter(scanner.Text())
// 	return result

// }

func mostFrequent(strArray []string) string {
	var count int
	var mostCommon string
	var mostCommonCount int

	for j := 0; j < len(strArray); j++ {
		count = 0
		for i := 0; i < len(strArray); i++ {

			if strArray[j] == strArray[i] {
				count++
			}
			if mostCommonCount < count {
				mostCommonCount = count
				mostCommon = strArray[j]
			}
		}
	}
	return mostCommon
}

func main() {

	// input := []string{"apple", "pie", "pie", "pie", "pie", "pie", "pie", "pie", "pie", "apple", "red", "apple", "apple", "red", "red"}
	// output := mostFrequent(userInputReader())
	input := []string{"apple", "pie", "apple", "red", "red", "red"}
	output := mostFrequent(input)

	fmt.Printf("%#v\n", output)

}
