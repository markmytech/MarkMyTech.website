import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Question {
  id: number;
  text: string;
  options: QuizOption[];
}

interface QuizOption {
  text: string;
  score: {
    consultation: number;
    starter: number;
    blueprint: number;
    advisor: number;
  };
}

interface RecommendationResult {
  packageName: string;
  description: string;
  link: string;
  linkText: string;
}

// Quiz questions and options
const questions: Question[] = [
  {
    id: 1,
    text: "What is your current stage with AI automation?",
    options: [
      {
        text: "Just starting to explore the possibilities",
        score: { consultation: 5, starter: 3, blueprint: 1, advisor: 0 }
      },
      {
        text: "I know I need it but not sure where to start",
        score: { consultation: 3, starter: 5, blueprint: 2, advisor: 0 }
      },
      {
        text: "I've tried some tools but need a comprehensive strategy",
        score: { consultation: 1, starter: 3, blueprint: 5, advisor: 2 }
      },
      {
        text: "I have systems in place but need optimization",
        score: { consultation: 0, starter: 1, blueprint: 3, advisor: 5 }
      }
    ]
  },
  {
    id: 2,
    text: "What is your business size?",
    options: [
      {
        text: "Solopreneur or very small team (1-3 people)",
        score: { consultation: 4, starter: 5, blueprint: 2, advisor: 1 }
      },
      {
        text: "Small business (4-20 employees)",
        score: { consultation: 2, starter: 4, blueprint: 5, advisor: 3 }
      },
      {
        text: "Medium business (21-100 employees)",
        score: { consultation: 1, starter: 2, blueprint: 5, advisor: 4 }
      },
      {
        text: "Large business (100+ employees)",
        score: { consultation: 0, starter: 1, blueprint: 3, advisor: 5 }
      }
    ]
  },
  {
    id: 3,
    text: "What's your timeline for implementing AI automation?",
    options: [
      {
        text: "I want to explore options first, no immediate timeline",
        score: { consultation: 5, starter: 3, blueprint: 1, advisor: 0 }
      },
      {
        text: "Within the next 1-3 months",
        score: { consultation: 2, starter: 5, blueprint: 4, advisor: 2 }
      },
      {
        text: "Within the next quarter",
        score: { consultation: 1, starter: 3, blueprint: 5, advisor: 3 }
      },
      {
        text: "Ongoing optimization of existing systems",
        score: { consultation: 0, starter: 1, blueprint: 3, advisor: 5 }
      }
    ]
  },
  {
    id: 4,
    text: "What's your primary goal with AI automation?",
    options: [
      {
        text: "Save time on repetitive tasks",
        score: { consultation: 3, starter: 5, blueprint: 4, advisor: 2 }
      },
      {
        text: "Improve data analysis and business insights",
        score: { consultation: 2, starter: 3, blueprint: 5, advisor: 4 }
      },
      {
        text: "Enhance customer experience",
        score: { consultation: 2, starter: 4, blueprint: 5, advisor: 3 }
      },
      {
        text: "Comprehensive digital transformation",
        score: { consultation: 1, starter: 1, blueprint: 4, advisor: 5 }
      }
    ]
  },
  {
    id: 5,
    text: "What's your budget for AI tools and consulting?",
    options: [
      {
        text: "Minimal/exploring options first",
        score: { consultation: 5, starter: 3, blueprint: 0, advisor: 0 }
      },
      {
        text: "$500-$2,000",
        score: { consultation: 2, starter: 5, blueprint: 2, advisor: 0 }
      },
      {
        text: "$2,000-$5,000",
        score: { consultation: 0, starter: 2, blueprint: 5, advisor: 2 }
      },
      {
        text: "$5,000+",
        score: { consultation: 0, starter: 1, blueprint: 4, advisor: 5 }
      }
    ]
  }
];

// Package recommendation logic
const getRecommendation = (scores: { [key: string]: number }): RecommendationResult => {
  const highestScore = Math.max(...Object.values(scores));
  const recommendedPackage = Object.keys(scores).find(key => scores[key] === highestScore) || 'consultation';
  
  const recommendations: { [key: string]: RecommendationResult } = {
    consultation: {
      packageName: "Free 30-Minute Consultation",
      description: "Based on your answers, we recommend starting with our free consultation to explore your needs and discover the potential of AI automation for your specific situation.",
      link: "https://calendar.app.google/MYPE1kzDMy6sDv2n6",
      linkText: "Book Your Free Consultation"
    },
    starter: {
      packageName: "Starter Plan",
      description: "Based on your answers, our Starter Plan is ideal for your needs. It provides focused automation recommendations for your most essential business processes.",
      link: "https://calendar.app.google/MYPE1kzDMy6sDv2n6",
      linkText: "Get Started"
    },
    blueprint: {
      packageName: "AI Automation Blueprint",
      description: "Based on your answers, our comprehensive AI Automation Blueprint is the perfect match for your needs. You'll get a detailed strategy and implementation roadmap.",
      link: "https://calendar.app.google/MYPE1kzDMy6sDv2n6",
      linkText: "Get Your Blueprint"
    },
    advisor: {
      packageName: "Ongoing Advisor",
      description: "Based on your answers, our Ongoing Advisor service is ideal for your situation. You'll benefit from continuous support and optimization of your AI automation systems.",
      link: "https://calendar.app.google/MYPE1kzDMy6sDv2n6",
      linkText: "Contact for Details"
    }
  };
  
  return recommendations[recommendedPackage];
};

export default function RecommendationQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
    
    // Track quiz start as an event
    trackEvent({
      category: 'quiz',
      action: 'start_quiz',
      label: 'service_recommendation_quiz'
    });
    
    // Also track as a funnel stage
    if (window.analytics?.trackFunnelStage) {
      window.analytics.trackFunnelStage({
        stage: 'quiz_started',
        pageSection: 'quiz',
        attributes: {
          quiz_type: 'service_recommendation'
        }
      });
    }
  };
  
  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results
      const scores = {
        consultation: 0,
        starter: 0,
        blueprint: 0,
        advisor: 0
      };
      
      answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];
        const option = question.options[answerIndex];
        
        scores.consultation += option.score.consultation;
        scores.starter += option.score.starter;
        scores.blueprint += option.score.blueprint;
        scores.advisor += option.score.advisor;
      });
      
      const recommendation = getRecommendation(scores);
      setResult(recommendation);
      
      // Track quiz completion as an event
      trackEvent({
        category: 'quiz',
        action: 'complete_quiz',
        label: 'service_recommendation_quiz',
        attributes: {
          recommendation: recommendation.packageName,
          answers_count: answers.length
        }
      });
      
      // Also track as a funnel stage progression
      if (window.analytics?.trackFunnelStage) {
        window.analytics.trackFunnelStage({
          stage: 'quiz_completed',
          previousStage: 'quiz_started',
          pageSection: 'quiz',
          attributes: {
            quiz_type: 'service_recommendation',
            recommendation: recommendation.packageName
          }
        });
      }
      
      // Track as a conversion metric
      if (window.analytics?.trackConversion) {
        window.analytics.trackConversion(
          'quiz_completion',
          1,
          {
            recommendation_package: recommendation.packageName,
            quiz_type: 'service_recommendation'
          }
        );
      }
    }
  };
  
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    
    trackEvent({
      category: 'quiz',
      action: 'restart_quiz',
      label: 'service_recommendation_quiz'
    });
  };
  
  const progressPercentage = ((currentQuestionIndex + (result ? 1 : 0)) / totalQuestions) * 100;
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <section id="quiz" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            Find Your Perfect AI Automation Package
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Answer a few quick questions to get a personalized service recommendation based on your specific needs.
          </p>
          
          {!showQuiz && !result && (
            <Button 
              onClick={handleStartQuiz}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
              data-analytics="quiz-start"
            >
              Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        
        {(showQuiz || result) && (
          <div className="max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold mb-6">
                        {currentQuestion.text}
                      </h3>
                      <div className="grid gap-4">
                        {currentQuestion.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start py-6 h-auto text-left hover:bg-primary/5"
                            onClick={() => handleSelectOption(index)}
                          >
                            {option.text}
                          </Button>
                        ))}
                      </div>
                      <div className="mt-8 text-right text-sm text-gray-500">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Card className="shadow-lg border-t-4 border-primary">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-center mb-6">
                        <CheckCircle className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-2">
                        {result.packageName}
                      </h3>
                      <p className="text-gray-600 text-center mb-8">
                        {result.description}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button 
                          asChild
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-white"
                          data-analytics="quiz-result-cta"
                          data-recommendation={result.packageName}
                        >
                          <a 
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {result.linkText}
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="lg" 
                          onClick={handleReset}
                          data-analytics="quiz-restart"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}