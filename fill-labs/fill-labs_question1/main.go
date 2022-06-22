package main

import (
	"fmt"
	"sort"
	"strings"
)

// var input = []string{"aaaasd", "a", "aab", "aaaabcd"}
// var input = []string{"ef", "cssssssd", "fdz", "kfd", "zc", "lklklklklklklklkl", "l"}

var input = []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"}

func sortArr(array []string, key string) []string {

	for i := 0; i < len(array); i++ {
		for j := i + 1; j < len(array); j++ {
			if strings.Contains(array[i], key) {
				if strings.Count(array[i], key) < strings.Count(array[j], key) {
					temp := array[j]
					array[j] = array[i]
					array[i] = temp
				} else if strings.Count(array[i], key) == strings.Count(array[j], key) {
					dump := []string{array[i], array[j]}
					sort.Strings(dump)
					array[i] = dump[0]
					array[j] = dump[1]
				}
			} else {
				if len(array[i]) < len(array[j]) {
					temp := array[j]
					array[j] = array[i]
					array[i] = temp
				} else if len(array[i]) == len(array[j]) {
					dump := []string{array[i], array[j]}
					sort.Strings(dump)
					array[i] = dump[0]
					array[j] = dump[1]
				}
			}
		}

	}
	return array
}

func main() {
	fmt.Println(sortArr(input, "a"))

}
