# fill-labs_question1

Fill Labs Recruitment Question No:1

## Question

Q1) Write a function that sorts a bunch of words by the number of character “a”s within the word (decreasing order). If some words contain the same amount of character “a”s then you need to sort those words by their lengths.

Input :
["aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"]

Output :
["aaaasd", "aaabcd", "aab", "a", "lklklklklklklklkl", "cssssssd", "fdz", "ef", "kf", "zc", "l"]

## Solution - Algorithm

- if contains "a"

* sort by "a"
* if there are same amount of "a"s then sort by length

- if does not contain "a"

* sort by length
* if there are same amount of characters then sort alphabetically
