"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Award, RefreshCw, TestTube, Star, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

// 题库数据
const allQuestions = [
  {
    question: "碳足迹主要衡量的是？",
    options: ["水资源消耗", "温室气体排放量", "土壤污染程度", "噪声污染范围"],
    answer: "B",
    difficulty: 1,
  },
  {
    question: "以下哪种行为会直接增加个人碳足迹？",
    options: ["步行上班", "乘坐飞机长途旅行", "使用节能灯泡", "回收废纸"],
    answer: "B",
    difficulty: 1,
  },
  {
    question: "下列能源中，碳排放量最低的是？",
    options: ["煤炭", "天然气", "太阳能", "石油"],
    answer: "C",
    difficulty: 1,
  },
  {
    question: "以下哪个国际协议旨在减少碳排放？",
    options: ["《巴黎协定》", "《日内瓦公约》", "《南极条约》", "《世界贸易协定》"],
    answer: "A",
    difficulty: 1,
  },
  {
    question: "1度电的碳排放量约为？",
    options: ["0.1千克CO₂", "0.5千克CO₂", "1千克CO₂", "2千克CO₂"],
    answer: "B",
    difficulty: 2,
  },
  {
    question: "以下哪种交通方式单位里程碳排放最高？",
    options: ["自行车", "电动汽车", "燃油汽车", "飞机"],
    answer: "D",
    difficulty: 2,
  },
  {
    question: "减少食物碳足迹的最佳方法是？",
    options: ["多吃进口水果", "减少肉类消费", "购买过度包装食品", "每日点外卖"],
    answer: "B",
    difficulty: 2,
  },
  {
    question: "下列哪种材料的生产过程碳排放最高？",
    options: ["玻璃", "塑料", "钢铁", "木材"],
    answer: "C",
    difficulty: 2,
  },
  {
    question: '以下哪项属于"范围3排放"？',
    options: ["公司自有车辆燃油消耗", "员工通勤交通", "办公室用电", "工厂直接排放"],
    answer: "B",
    difficulty: 3,
  },
  {
    question: "一个人年均碳足迹全球平均约为？",
    options: ["1吨CO₂", "4吨CO₂", "10吨CO₂", "20吨CO₂"],
    answer: "B",
    difficulty: 3,
  },
  {
    question: "哪种农业活动碳排放最高？",
    options: ["种植小麦", "养殖奶牛", "种植蔬菜", "养蜂"],
    answer: "B",
    difficulty: 3,
  },
  {
    question: "以下哪种行为对碳足迹影响最小？",
    options: ["调低空调温度2℃", "每周少吃一顿牛肉", "改用LED灯泡", "每天多喝1瓶矿泉水"],
    answer: "D",
    difficulty: 3,
  },
  {
    question: "一辆燃油车百公里油耗8升，每升汽油排放2.3kg CO₂，行驶100公里碳排放为？",
    options: ["16.4kg", "18.4kg", "20.4kg", "22.4kg"],
    answer: "B",
    difficulty: 4,
  },
  {
    question: '若某国承诺在2030年实现"碳中和"，意味着？',
    options: ["完全停止排放CO₂", "碳排放量与碳汇量相等", "碳排放量减少50%", "仅使用可再生能源"],
    answer: "B",
    difficulty: 4,
  },
  {
    question: "某产品生命周期碳排放包括：生产（200kg）、运输（50kg）、使用（300kg）、废弃（100kg），其碳足迹为？",
    options: ["200kg", "500kg", "650kg", "750kg"],
    answer: "C",
    difficulty: 4,
  },
  {
    question: "根据IPCC报告，全球温升控制在1.5℃内，需在2050年前实现？",
    options: ["碳达峰", "碳中和", "碳排放翻倍", "碳税全面实施"],
    answer: "B",
    difficulty: 4,
  },
  {
    question: "欧盟碳边境调节机制（CBAM）主要针对以下哪种情况？",
    options: [
      "对高碳排放进口商品征税，以保护本土产业",
      "强制要求进口商品使用可再生能源生产",
      "禁止所有非欧盟国家的高碳产品进入",
      "仅对发展中国家征收额外关税",
    ],
    answer: "A",
    difficulty: 5,
  },
  {
    question: "根据ISO 14067标准，产品碳足迹的计算范围必须包含？",
    options: ["仅生产阶段", "原材料开采到产品废弃的全生命周期", "仅使用阶段的能源消耗", "运输和包装环节"],
    answer: "B",
    difficulty: 5,
  },
  {
    question: "国际航空碳抵消和减排计划（CORSIA）中，航空公司的碳排放基线基于？",
    options: [
      "2015年全球航空排放总量",
      "2019年和2020年排放量的平均值",
      "2030年预期排放目标",
      "各航空公司历史最低排放量",
    ],
    answer: "B",
    difficulty: 5,
  },
  {
    question: "某森林碳汇项目宣称每年吸收1万吨CO₂，持续10年。若第10年发生火灾烧毁50%林木，其实际净碳汇量为？",
    options: ["5万吨CO₂", "10万吨CO₂", "7.5万吨CO₂", "0吨CO₂"],
    answer: "A",
    difficulty: 5,
  },
]

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<typeof allQuestions>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(10).fill(""))
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [userName, setUserName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [showCertificate, setShowCertificate] = useState(false)

  // 随机选择10道题
  useEffect(() => {
    startNewQuiz()
  }, [])

  const startNewQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 10)
    setQuizQuestions(selected)
    setCurrentQuestion(0)
    setSelectedAnswers(Array(10).fill(""))
    setShowResults(false)
    setShowCertificate(false)
    setScore(0)
    setShowNameInput(true)
    setUserName("")
  }

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = value
    setSelectedAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuiz = () => {
    let totalScore = 0

    quizQuestions.forEach((question, index) => {
      const answerIndex = ["A", "B", "C", "D"].indexOf(question.answer)
      if (selectedAnswers[index] === question.options[answerIndex]) {
        totalScore += 10
      }
    })

    setScore(totalScore)
    setShowResults(true)

    // 如果得分70分以上，显示证书
    if (totalScore >= 70) {
      setTimeout(() => {
        setShowCertificate(true)
      }, 2000) // 2秒后显示证书
    }
  }

  const closeResults = () => {
    setShowResults(false)
  }

  const startQuiz = () => {
    if (userName.trim()) {
      setShowNameInput(false)
    }
  }

  // 测试证书功能
  const testCertificate = () => {
    setUserName("测试用户")
    setScore(85)
    setShowCertificate(true)
  }

  // 如果还没输入名字，显示名字输入界面
  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-green-800 dark:text-green-300 mb-8">碳足迹知识竞赛</h1>

          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-6">欢迎参加碳足迹知识竞赛！</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">请输入您的姓名开始测试</p>
              <div className="space-y-4">
                <Input
                  placeholder="请输入您的姓名"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-center"
                />
                <Button
                  onClick={startQuiz}
                  disabled={!userName.trim()}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  开始测试
                </Button>

                {/* 测试证书按钮 */}
                <Button
                  onClick={testCertificate}
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  测试证书生成
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // 如果题目还没加载完成，显示加载中
  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>加载中...</p>
      </div>
    )
  }

  const currentQuizQuestion = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-green-800 dark:text-green-300 mb-8">碳足迹知识竞赛</h1>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium text-gray-500">
                难度: {Array(currentQuizQuestion.difficulty).fill("★").join("")}
              </div>
              <div className="text-sm font-medium text-gray-500">
                问题 {currentQuestion + 1} / {quizQuestions.length}
              </div>
            </div>

            <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-6">
              {currentQuizQuestion.question}
            </h2>

            <RadioGroup
              value={selectedAnswers[currentQuestion]}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuizQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                  <RadioGroupItem value={option} id={`option-${index}`} className="text-green-600" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {["A", "B", "C", "D"][index]}. {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8">
              <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
                上一题
              </Button>

              {currentQuestion === quizQuestions.length - 1 ? (
                <Button
                  onClick={submitQuiz}
                  disabled={selectedAnswers.some((answer) => answer === "")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  提交答案
                </Button>
              ) : (
                <Button onClick={goToNextQuestion} className="bg-green-600 hover:bg-green-700">
                  下一题
                </Button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {quizQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`w-10 h-10 ${
                    index === currentQuestion
                      ? "bg-green-100 border-green-500"
                      : selectedAnswers[index]
                        ? "bg-gray-100"
                        : ""
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {/* 测试证书按钮 - 在答题界面也添加一个 */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={testCertificate}
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <TestTube className="mr-2 h-4 w-4" />
                测试证书生成
              </Button>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showResults} onOpenChange={closeResults}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">测试结果</DialogTitle>
              <DialogDescription className="text-center">您的得分是</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-6">
              <div className="relative">
                <Award className="h-24 w-24 text-yellow-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{score}</span>
                </div>
              </div>
              <p className="mt-4 text-center text-gray-700">
                {score >= 80
                  ? "太棒了！您对碳足迹知识有很深的了解！"
                  : score >= 60
                    ? "不错！您对碳足迹有基本的了解。"
                    : "继续加油！多了解一些碳足迹知识。"}
              </p>
            </div>
            <DialogFooter className="flex justify-center">
              <Button onClick={startNewQuiz} className="bg-green-600 hover:bg-green-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                再次测试
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900 dark:via-amber-900 dark:to-orange-900 p-12 rounded-2xl border-8 border-double border-yellow-400 dark:border-yellow-500 shadow-2xl overflow-hidden">
              {/* 装饰性背景元素 */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-4 left-4">
                  <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute top-8 right-8">
                  <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-8">
                  <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute bottom-8 right-4">
                  <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                </div>
              </div>

              {/* 顶部装饰边框 */}
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400"></div>
              <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400"></div>
              <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-400"></div>
              <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-400"></div>

              <div className="relative text-center space-y-8">
                {/* 顶部徽章 */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-yellow-300 to-amber-400 dark:from-yellow-400 dark:to-amber-500 rounded-full p-6 shadow-xl border-4 border-yellow-500 dark:border-yellow-400">
                      <Award className="h-20 w-20 text-yellow-800 dark:text-yellow-900" />
                    </div>
                    {/* 光环效果 */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full opacity-30 animate-pulse"></div>
                  </div>
                </div>

                {/* 标题区域 */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 dark:from-yellow-400 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                    碳足迹卫士证书
                  </h1>
                  <div className="flex justify-center">
                    <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-full shadow-lg"></div>
                  </div>
                  <p className="text-lg font-medium text-amber-700 dark:text-amber-300">
                    CARBON FOOTPRINT GUARDIAN CERTIFICATE
                  </p>
                </div>

                {/* 证书内容 */}
                <div className="space-y-6 bg-white/50 dark:bg-gray-800/30 rounded-xl p-8 border-2 border-yellow-300 dark:border-yellow-500 shadow-inner">
                  <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">兹证明</p>

                  <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-800 dark:to-amber-800 rounded-lg p-4 border-2 border-yellow-400 dark:border-yellow-500">
                    <p className="text-4xl font-bold bg-gradient-to-r from-yellow-700 via-amber-700 to-yellow-800 dark:from-yellow-300 dark:via-amber-300 dark:to-yellow-400 bg-clip-text text-transparent">
                      {userName}
                    </p>
                  </div>

                  <p className="text-xl text-gray-700 dark:text-gray-300">在碳足迹知识竞赛中表现优异</p>

                  <div className="flex justify-center items-center space-x-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 px-6 py-3 rounded-full font-bold text-2xl shadow-lg border-2 border-yellow-500">
                      获得 {score} 分
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">荣获</p>
                    <div className="bg-gradient-to-r from-yellow-300 to-amber-300 dark:from-yellow-600 dark:to-amber-600 text-yellow-900 dark:text-yellow-100 px-8 py-4 rounded-xl font-bold text-2xl shadow-lg border-2 border-yellow-500 dark:border-yellow-400">
                      "碳足迹卫士"称号
                    </div>
                  </div>
                </div>

                {/* 底部信息 */}
                <div className="pt-6 border-t-2 border-yellow-300 dark:border-yellow-500 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-amber-600 dark:text-amber-400">
                      <p className="font-medium">颁发日期</p>
                      <p>{new Date().toLocaleDateString("zh-CN")}</p>
                    </div>
                    <div className="text-amber-600 dark:text-amber-400 text-right">
                      <p className="font-medium">颁发机构</p>
                      <p>碳足迹计算器平台</p>
                    </div>
                  </div>

                  {/* 认证编号 */}
                  <div className="text-center">
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      证书编号: CF-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, "0")}-
                      {Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* 关闭按钮 */}
                <div className="pt-4">
                  <Button
                    onClick={() => setShowCertificate(false)}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-yellow-900 font-bold px-8 py-3 rounded-full shadow-lg border-2 border-yellow-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    保存证书
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
