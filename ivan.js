const IVAN_PROBS = {
  "0":{
      "up":[
          0,
          61,
          94,
          97
      ],
      "down":[
          0,
          1,
          2,
          3
      ],
      "left":[
          0,
          3,
          40,
          94
      ],
      "right":[
          0,
          1,
          10,
          61
      ]
  },
  "1":{
      "up":[
          0
      ],
      "down":[
          4,
          10
      ],
      "left":[
          0
      ],
      "right":[
          2,
          4
      ]
  },
  "2":{
      "up":[
          0
      ],
      "down":[
          5,
          6,
          7,
          8
      ],
      "left":[
          1,
          2,
          9
      ],
      "right":[
          2,
          3,
          4
      ]
  },
  "3":{
      "up":[
          0
      ],
      "down":[
          9,
          40
      ],
      "left":[
          2,
          9
      ],
      "right":[
          0
      ]
  },
  "4":{
      "up":[
          1,
          10
      ],
      "down":[
          5,
          6
      ],
      "left":[
          2,
          1
      ],
      "right":[
          5,
          6,
          23
      ]
  },
  "5":{
      "up":[
          2,
          4,
          7,
          5,
          9,
          11,
          20,
          21,
          22,
          15,
          33,
          43,
          38,
          53,
          54,
          55,
          67,
          79,
          80,
          81,
          83,
          86,
          71,
          90,
          96
      ],
      "down":[
          6,
          5,
          7,
          14,
          32,
          16,
          17,
          47,
          48,
          49,
          8,
          56,
          33,
          62,
          51,
          18,
          19,
          76,
          87,
          88,
          90,
          91,
          93,
          96,
          97
      ],
      "left":[
          4,
          8,
          5,
          10,
          11,
          12,
          20,
          23,
          28,
          31,
          32,
          37,
          38,
          49,
          51,
          55,
          50,
          62,
          71,
          54,
          76,
          83,
          91
      ],
      "right":[
          6,
          5,
          9,
          12,
          21,
          23,
          24,
          15,
          32,
          33,
          38,
          39,
          47,
          50,
          56,
          40,
          60,
          64,
          65,
          43,
          66,
          67,
          53,
          34,
          41,
          87,
          89,
          91,
          93,
          88,
          20
      ]
  },
  "6":{
      "up":[
          2,
          5,
          4,
          7,
          11,
          82,
          42
      ],
      "down":[
          11,
          23,
          24,
          34,
          29
      ],
      "left":[
          5,
          4,
          11,
          10,
          23,
          82
      ],
      "right":[
          7,
          11,
          16,
          29,
          19,
          8
      ]
  },
  "7":{
      "up":[
          2,
          5,
          9
      ],
      "down":[
          5,
          6,
          19,
          8,
          20,
          21,
          22,
          33
      ],
      "left":[
          6,
          15,
          7,
          39
      ],
      "right":[
          8,
          11,
          7
      ]
  },
  "8":{
      "up":[
          2,
          7,
          38,
          5,
          15
      ],
      "down":[
          12,
          15,
          28,
          50,
          46
      ],
      "left":[
          7,
          19,
          17,
          46,
          18,
          15,
          6
      ],
      "right":[
          5,
          20,
          9,
          40,
          53,
          74,
          50
      ]
  },
  "9":{
      "up":[
          3,
          40
      ],
      "down":[
          5,
          7
      ],
      "left":[
          5,
          8,
          50
      ],
      "right":[
          3,
          2
      ]
  },
  "10":{
      "up":[
          1,
          10,
          62
      ],
      "down":[
          4,
          10,
          61
      ],
      "left":[
          0
      ],
      "right":[
          5,
          6,
          34,
          41,
          43,
          23
      ]
  },
  "11":{
      "up":[
          6,
          23
      ],
      "down":[
          13,
          16,
          5,
          35,
          6
      ],
      "left":[
          6,
          7
      ],
      "right":[
          5,
          13,
          6
      ]
  },
  "12":{
      "up":[
          8,
          12,
          70
      ],
      "down":[
          15,
          39,
          46,
          12,
          71,
          50
      ],
      "left":[
          5,
          33,
          27,
          79,
          29,
          85
      ],
      "right":[
          5,
          80,
          50,
          20,
          88
      ]
  },
  "13":{
      "up":[
          11
      ],
      "down":[
          17
      ],
      "left":[
          11
      ],
      "right":[
          14
      ]
  },
  "14":{
      "up":[
          5
      ],
      "down":[
          18
      ],
      "left":[
          13
      ],
      "right":[
          15
      ]
  },
  "15":{
      "up":[
          12,
          8,
          50
      ],
      "down":[
          19,
          5,
          8
      ],
      "left":[
          14,
          22,
          5
      ],
      "right":[
          7,
          8
      ]
  },
  "16":{
      "up":[
          11,
          5
      ],
      "down":[
          25
      ],
      "left":[
          6,
          46
      ],
      "right":[
          17
      ]
  },
  "17":{
      "up":[
          13,
          5
      ],
      "down":[
          26
      ],
      "left":[
          16
      ],
      "right":[
          18,
          8
      ]
  },
  "18":{
      "up":[
          14,
          5,
          71
      ],
      "down":[
          27,
          79
      ],
      "left":[
          17,
          46
      ],
      "right":[
          19,
          8
      ]
  },
  "19":{
      "up":[
          15,
          7,
          5
      ],
      "down":[
          27,
          58
      ],
      "left":[
          18,
          19,
          6,
          46
      ],
      "right":[
          19,
          8,
          29
      ]
  },
  "20":{
      "up":[
          7,
          55,
          71,
          96
      ],
      "down":[
          5,
          48,
          96
      ],
      "left":[
          8,
          66,
          12,
          5
      ],
      "right":[
          5,
          32,
          50
      ]
  },
  "21":{
      "up":[
          7,
          79
      ],
      "down":[
          5
      ],
      "left":[
          5,
          83
      ],
      "right":[
          22
      ]
  },
  "22":{
      "up":[
          7,
          79
      ],
      "down":[
          5
      ],
      "left":[
          21
      ],
      "right":[
          15,
          86
      ]
  },
  "23":{
      "up":[
          6,
          51,
          23,
          24,
          41
      ],
      "down":[
          11,
          43,
          23,
          34
      ],
      "left":[
          5,
          10,
          4,
          42,
          23
      ],
      "right":[
          5,
          43,
          6,
          24,
          83,
          23
      ]
  },
  "24":{
      "up":[
          6,
          44,
          24
      ],
      "down":[
          29,
          43,
          24,
          23
      ],
      "left":[
          5,
          35,
          51,
          23
      ],
      "right":[
          25,
          27,
          78
      ]
  },
  "25":{
      "up":[
          16
      ],
      "down":[
          27,
          58
      ],
      "left":[
          24,
          27
      ],
      "right":[
          26
      ]
  },
  "26":{
      "up":[
          17
      ],
      "down":[
          27,
          59
      ],
      "left":[
          25
      ],
      "right":[
          27,
          46
      ]
  },
  "27":{
      "up":[
          18,
          19,
          25,
          26,
          27,
          29,
          36,
          45,
          46,
          57,
          58,
          63,
          72,
          73,
          77,
          85,
          92
      ],
      "down":[
          27,
          30,
          44,
          45,
          52,
          58,
          68,
          69,
          70,
          77,
          78,
          79,
          84,
          90
      ],
      "left":[
          26,
          27,
          29,
          24,
          45,
          30,
          52,
          36,
          57,
          59,
          44,
          58,
          63,
          69,
          73,
          77,
          89
      ],
      "right":[
          27,
          28,
          30,
          36,
          46,
          45,
          25,
          57,
          58,
          12,
          63,
          70,
          72,
          77,
          78
      ]
  },
  "28":{
      "up":[
          8
      ],
      "down":[
          31
      ],
      "left":[
          27
      ],
      "right":[
          5
      ]
  },
  "29":{
      "up":[
          24,
          6
      ],
      "down":[
          27,
          70,
          85
      ],
      "left":[
          6,
          19
      ],
      "right":[
          27,
          58,
          12,
          70,
          85
      ]
  },
  "30":{
      "up":[
          27
      ],
      "down":[
          36
      ],
      "left":[
          27
      ],
      "right":[
          31,
          27
      ]
  },
  "31":{
      "up":[
          28
      ],
      "down":[
          37
      ],
      "left":[
          30
      ],
      "right":[
          5
      ]
  },
  "32":{
      "up":[
          5
      ],
      "down":[
          38
      ],
      "left":[
          5,
          20
      ],
      "right":[
          5
      ]
  },
  "33":{
      "up":[
          7,
          5
      ],
      "down":[
          5,
          64
      ],
      "left":[
          5
      ],
      "right":[
          12,
          49
      ]
  },
  "34":{
      "up":[
          6,
          23
      ],
      "down":[
          41
      ],
      "left":[
          10,
          5
      ],
      "right":[
          35
      ]
  },
  "35":{
      "up":[
          11,
          43
      ],
      "down":[
          42
      ],
      "left":[
          34
      ],
      "right":[
          24
      ]
  },
  "36":{
      "up":[
          30
      ],
      "down":[
          27
      ],
      "left":[
          27
      ],
      "right":[
          37,
          27,
          68
      ]
  },
  "37":{
      "up":[
          31
      ],
      "down":[
          46
      ],
      "left":[
          36
      ],
      "right":[
          5
      ]
  },
  "38":{
      "up":[
          32,
          39
      ],
      "down":[
          8,
          5
      ],
      "left":[
          5,
          48
      ],
      "right":[
          5
      ]
  },
  "39":{
      "up":[
          12
      ],
      "down":[
          38
      ],
      "left":[
          5
      ],
      "right":[
          7
      ]
  },
  "40":{
      "up":[
          3,
          40,
          93
      ],
      "down":[
          9,
          40,
          94
      ],
      "left":[
          8,
          5,
          50,
          71
      ],
      "right":[
          0
      ]
  },
  "41":{
      "up":[
          34
      ],
      "down":[
          43,
          23
      ],
      "left":[
          10,
          5
      ],
      "right":[
          42
      ]
  },
  "42":{
      "up":[
          35
      ],
      "down":[
          51,
          6
      ],
      "left":[
          41
      ],
      "right":[
          43,
          23
      ]
  },
  "43":{
      "up":[
          24,
          41,
          23,
          51
      ],
      "down":[
          5,
          51,
          35,
          62,
          97,
          96
      ],
      "left":[
          42,
          10,
          62,
          51,
          5,
          23,
          71
      ],
      "right":[
          44,
          51,
          90,
          96
      ]
  },
  "44":{
      "up":[
          27
      ],
      "down":[
          24
      ],
      "left":[
          43
      ],
      "right":[
          45,
          27
      ]
  },
  "45":{
      "up":[
          27
      ],
      "down":[
          27
      ],
      "left":[
          44,
          27,
          92
      ],
      "right":[
          27,
          52
      ]
  },
  "46":{
      "up":[
          37,
          8,
          12,
          70,
          50
      ],
      "down":[
          27,
          78
      ],
      "left":[
          27,
          26,
          87
      ],
      "right":[
          16,
          8,
          18,
          19
      ]
  },
  "47":{
      "up":[
          5,
          66
      ],
      "down":[
          53
      ],
      "left":[
          5
      ],
      "right":[
          48
      ]
  },
  "48":{
      "up":[
          5,
          20
      ],
      "down":[
          54
      ],
      "left":[
          47
      ],
      "right":[
          49,
          38
      ]
  },
  "49":{
      "up":[
          5
      ],
      "down":[
          55
      ],
      "left":[
          48,
          33
      ],
      "right":[
          5
      ]
  },
  "50":{
      "up":[
          8,
          50,
          12,
          88
      ],
      "down":[
          50,
          15,
          46,
          71
      ],
      "left":[
          5,
          56,
          60,
          65,
          67,
          8,
          12,
          71,
          20
      ],
      "right":[
          9,
          5,
          40,
          93
      ]
  },
  "51":{
      "up":[
          42,
          5,
          43,
          96
      ],
      "down":[
          23,
          43
      ],
      "left":[
          43,
          90,
          96,
          88
      ],
      "right":[
          5,
          43,
          24,
          89
      ]
  },
  "52":{
      "up":[
          27
      ],
      "down":[
          57
      ],
      "left":[
          45
      ],
      "right":[
          27
      ]
  },
  "53":{
      "up":[
          47
      ],
      "down":[
          5,
          74
      ],
      "left":[
          8,
          5
      ],
      "right":[
          54
      ]
  },
  "54":{
      "up":[
          48
      ],
      "down":[
          5,
          75
      ],
      "left":[
          53
      ],
      "right":[
          55,
          5
      ]
  },
  "55":{
      "up":[
          49
      ],
      "down":[
          5,
          20
      ],
      "left":[
          54,
          64
      ],
      "right":[
          5
      ]
  },
  "56":{
      "up":[
          5
      ],
      "down":[
          60
      ],
      "left":[
          5
      ],
      "right":[
          50
      ]
  },
  "57":{
      "up":[
          52
      ],
      "down":[
          27
      ],
      "left":[
          27
      ],
      "right":[
          27
      ]
  },
  "58":{
      "up":[
          25,
          27,
          19
      ],
      "down":[
          27
      ],
      "left":[
          27,
          29
      ],
      "right":[
          59,
          27
      ]
  },
  "59":{
      "up":[
          26
      ],
      "down":[
          63
      ],
      "left":[
          58
      ],
      "right":[
          27
      ]
  },
  "60":{
      "up":[
          56
      ],
      "down":[
          65
      ],
      "left":[
          5
      ],
      "right":[
          50
      ]
  },
  "61":{
      "up":[
          10,
          62
      ],
      "down":[
          0
      ],
      "left":[
          0
      ],
      "right":[
          62,
          97
      ]
  },
  "62":{
      "up":[
          5,
          43,
          96,
          71
      ],
      "down":[
          10,
          61
      ],
      "left":[
          61,
          97
      ],
      "right":[
          43,
          5
      ]
  },
  "63":{
      "up":[
          59
      ],
      "down":[
          27
      ],
      "left":[
          27
      ],
      "right":[
          27
      ]
  },
  "64":{
      "up":[
          33
      ],
      "down":[
          66
      ],
      "left":[
          5
      ],
      "right":[
          55
      ]
  },
  "65":{
      "up":[
          60
      ],
      "down":[
          67
      ],
      "left":[
          5
      ],
      "right":[
          50
      ]
  },
  "66":{
      "up":[
          64
      ],
      "down":[
          47
      ],
      "left":[
          5
      ],
      "right":[
          20
      ]
  },
  "67":{
      "up":[
          65
      ],
      "down":[
          5
      ],
      "left":[
          5
      ],
      "right":[
          50
      ]
  },
  "68":{
      "up":[
          27
      ],
      "down":[
          72
      ],
      "left":[
          36
      ],
      "right":[
          69
      ]
  },
  "69":{
      "up":[
          27
      ],
      "down":[
          73
      ],
      "left":[
          68
      ],
      "right":[
          27
      ]
  },
  "70":{
      "up":[
          27,
          29
      ],
      "down":[
          46,
          12
      ],
      "left":[
          27,
          29
      ],
      "right":[
          71
      ]
  },
  "71":{
      "up":[
          12,
          50,
          88
      ],
      "down":[
          18,
          20,
          88,
          5,
          93,
          96,
          62,
          97
      ],
      "left":[
          70,
          88,
          96,
          90
      ],
      "right":[
          5,
          50,
          88,
          40,
          93,
          43
      ]
  },
  "72":{
      "up":[
          68
      ],
      "down":[
          27
      ],
      "left":[
          27
      ],
      "right":[
          73
      ]
  },
  "73":{
      "up":[
          69
      ],
      "down":[
          27
      ],
      "left":[
          72
      ],
      "right":[
          27
      ]
  },
  "74":{
      "up":[
          53
      ],
      "down":[
          80
      ],
      "left":[
          8
      ],
      "right":[
          75
      ]
  },
  "75":{
      "up":[
          54
      ],
      "down":[
          81
      ],
      "left":[
          74
      ],
      "right":[
          76
      ]
  },
  "76":{
      "up":[
          5
      ],
      "down":[
          82
      ],
      "left":[
          75
      ],
      "right":[
          5
      ]
  },
  "77":{
      "up":[
          27
      ],
      "down":[
          27
      ],
      "left":[
          27
      ],
      "right":[
          27
      ]
  },
  "78":{
      "up":[
          46,
          27
      ],
      "down":[
          83
      ],
      "left":[
          27,
          24,
          84
      ],
      "right":[
          79,
          84,
          83
      ]
  },
  "79":{
      "up":[
          18,
          27
      ],
      "down":[
          5,
          21,
          22
      ],
      "left":[
          78,
          79
      ],
      "right":[
          12,
          83,
          79,
          84
      ]
  },
  "80":{
      "up":[
          74
      ],
      "down":[
          5
      ],
      "left":[
          12
      ],
      "right":[
          81
      ]
  },
  "81":{
      "up":[
          75
      ],
      "down":[
          5
      ],
      "left":[
          80
      ],
      "right":[
          82
      ]
  },
  "82":{
      "up":[
          76
      ],
      "down":[
          6
      ],
      "left":[
          81
      ],
      "right":[
          6
      ]
  },
  "83":{
      "up":[
          78
      ],
      "down":[
          5
      ],
      "left":[
          79,
          78,
          23,
          86
      ],
      "right":[
          5,
          86,
          21
      ]
  },
  "84":{
      "up":[
          27
      ],
      "down":[
          86
      ],
      "left":[
          78,
          79
      ],
      "right":[
          78
      ]
  },
  "85":{
      "up":[
          29
      ],
      "down":[
          27
      ],
      "left":[
          29
      ],
      "right":[
          12
      ]
  },
  "86":{
      "up":[
          84
      ],
      "down":[
          5
      ],
      "left":[
          83,
          22
      ],
      "right":[
          83
      ]
  },
  "87":{
      "up":[
          5
      ],
      "down":[
          89
      ],
      "left":[
          5
      ],
      "right":[
          46,
          92
      ]
  },
  "88":{
      "up":[
          5,
          71,
          95,
          90
      ],
      "down":[
          71,
          50
      ],
      "left":[
          71,
          12,
          5
      ],
      "right":[
          71,
          95,
          51,
          96
      ]
  },
  "89":{
      "up":[
          87
      ],
      "down":[
          92,
          96
      ],
      "left":[
          5,
          51
      ],
      "right":[
          27
      ]
  },
  "90":{
      "up":[
          5,
          27
      ],
      "down":[
          5,
          88,
          96
      ],
      "left":[
          43,
          90,
          96
      ],
      "right":[
          90,
          51,
          71
      ]
  },
  "91":{
      "up":[
          5
      ],
      "down":[
          95
      ],
      "left":[
          5
      ],
      "right":[
          5
      ]
  },
  "92":{
      "up":[
          89
      ],
      "down":[
          27
      ],
      "left":[
          87
      ],
      "right":[
          45
      ]
  },
  "93":{
      "up":[
          5,
          71,
          96
      ],
      "down":[
          94,
          40
      ],
      "left":[
          5,
          71,
          50
      ],
      "right":[
          94,
          97
      ]
  },
  "94":{
      "up":[
          40,
          93
      ],
      "down":[
          0
      ],
      "left":[
          93,
          97
      ],
      "right":[
          0
      ]
  },
  "95":{
      "up":[
          91
      ],
      "down":[
          88
      ],
      "left":[
          88
      ],
      "right":[
          96
      ]
  },
  "96":{
      "up":[
          5,
          89,
          43,
          96,
          71,
          90,
          20
      ],
      "down":[
          51,
          5,
          62,
          96,
          20,
          97,
          93
      ],
      "left":[
          95,
          96,
          43,
          88
      ],
      "right":[
          96,
          51,
          71,
          90
      ]
  },
  "97":{
      "up":[
          5,
          43,
          96,
          71
      ],
      "down":[
          0
      ],
      "left":[
          61,
          97,
          93
      ],
      "right":[
          97,
          62,
          94
      ]
  }
}