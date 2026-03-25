"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  Compass,
  UserCircle,
  Flame,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface JourneyStep {
  key: string;
  icon: typeof BookOpen;
  title: string;
  description: string;
  href: string;
  color: string;
  bgColor: string;
  checkKey: string;
}

function getSteps(source: "cognitive" | "enneagram", typeCode?: string): JourneyStep[] {
  const cognitiveLearnHref = typeCode
    ? `/cognitive/learn?type=${typeCode}`
    : "/cognitive/learn";

  if (source === "cognitive") {
    return [
      {
        key: "learn-stack",
        icon: BookOpen,
        title: "Learn Your Function Stack",
        description: "Deep dive into your dominant, auxiliary, tertiary, and inferior functions.",
        href: cognitiveLearnHref,
        color: "from-indigo-400 to-indigo-500",
        bgColor: "bg-indigo-50",
        checkKey: "journey-learn-stack",
      },
      {
        key: "shadow",
        icon: Eye,
        title: "Understand Your Shadow",
        description: "Explore the 4 shadow functions and Beebe's archetypal model.",
        href: "/cognitive/learn#shadow",
        color: "from-violet-400 to-violet-500",
        bgColor: "bg-violet-50",
        checkKey: "journey-shadow",
      },
      {
        key: "enneagram",
        icon: Compass,
        title: "Explore Your Enneagram",
        description: "Discover your core type, instinct, and subtype.",
        href: "/enneagram/assess",
        color: "from-sky-400 to-sky-500",
        bgColor: "bg-sky-50",
        checkKey: "journey-enneagram",
      },
      {
        key: "profile",
        icon: UserCircle,
        title: "Set Up Your Profile",
        description: "Save your types and customize your experience.",
        href: "/profile",
        color: "from-emerald-400 to-emerald-500",
        bgColor: "bg-emerald-50",
        checkKey: "journey-profile",
      },
      {
        key: "daily",
        icon: Flame,
        title: "Start Daily Practice",
        description: "Personalized quizzes, insights, and growth prompts every day.",
        href: "/daily",
        color: "from-orange-400 to-orange-500",
        bgColor: "bg-orange-50",
        checkKey: "journey-daily",
      },
    ];
  }

  // Enneagram source
  return [
    {
      key: "cognitive-assess",
      icon: BookOpen,
      title: "Discover Your Cognitive Type",
      description: "Take the Jungian cognitive functions assessment to find your function stack.",
      href: "/cognitive",
      color: "from-indigo-400 to-indigo-500",
      bgColor: "bg-indigo-50",
      checkKey: "journey-cognitive",
    },
    {
      key: "learn-stack",
      icon: Eye,
      title: "Learn Your Function Stack",
      description: "Deep dive into how your mind perceives and judges information.",
      href: cognitiveLearnHref,
      color: "from-violet-400 to-violet-500",
      bgColor: "bg-violet-50",
      checkKey: "journey-learn-stack",
    },
    {
      key: "shadow",
      icon: Eye,
      title: "Explore Your Shadow Functions",
      description: "Understand the unconscious side of your personality through Beebe's model.",
      href: "/cognitive/learn#shadow",
      color: "from-slate-400 to-slate-500",
      bgColor: "bg-slate-50",
      checkKey: "journey-shadow",
    },
    {
      key: "profile",
      icon: UserCircle,
      title: "Set Up Your Profile",
      description: "Save both your Enneagram and cognitive types in one place.",
      href: "/profile",
      color: "from-emerald-400 to-emerald-500",
      bgColor: "bg-emerald-50",
      checkKey: "journey-profile",
    },
    {
      key: "daily",
      icon: Flame,
      title: "Start Daily Practice",
      description: "Type-personalized quizzes, insights, and growth prompts every day.",
      href: "/daily",
      color: "from-orange-400 to-orange-500",
      bgColor: "bg-orange-50",
      checkKey: "journey-daily",
    },
  ];
}

interface GuidedJourneyProps {
  source: "cognitive" | "enneagram";
  typeCode?: string;
}

export default function GuidedJourney({ source, typeCode }: GuidedJourneyProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const steps = getSteps(source, typeCode);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem("psyche-profile") || "{}");
      const completed: Record<string, boolean> = {};

      // Check if enneagram assessment was done
      if (profile.enneagramType) {
        completed["journey-enneagram"] = true;
      }
      // Check if cognitive assessment was done
      if (profile.cognitiveType) {
        completed["journey-cognitive"] = true;
        completed["journey-learn-stack"] = true;
      }
      // Check if profile was set up (has at least one type)
      if (profile.enneagramType || profile.cognitiveType) {
        completed["journey-profile"] = true;
      }
      // Check if daily practice was done
      if (profile.completedQuizzes?.length > 0 || profile.streakCount > 0) {
        completed["journey-daily"] = true;
      }

      // Also check localStorage for individual journey step markers
      steps.forEach((step) => {
        const stored = localStorage.getItem(step.checkKey);
        if (stored === "true") {
          completed[step.checkKey] = true;
        }
      });

      setCompletedSteps(completed);
    } catch {}
  }, []);

  const handleStepClick = (checkKey: string) => {
    try {
      localStorage.setItem(checkKey, "true");
    } catch {}
  };

  return (
    <div className="mt-12 pt-10 border-t border-slate-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Your Personalized Learning Path
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
          Recommended Next Steps
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Continue your journey of self-discovery with these guided steps.
        </p>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        {steps.map((step, i) => {
          const isCompleted = completedSteps[step.checkKey];

          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href={step.href}
                onClick={() => handleStepClick(step.checkKey)}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                  isCompleted
                    ? "bg-emerald-50/50 border-emerald-100 hover:shadow-sm"
                    : "bg-white border-slate-100 hover:border-sky-200 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Step number / check */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? "bg-emerald-100"
                      : step.bgColor
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <step.icon className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${isCompleted ? "text-emerald-700" : "text-slate-800"}`}>
                    <span className="text-xs text-slate-300 font-mono mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{step.description}</div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className={`w-4 h-4 flex-shrink-0 transition-all ${
                    isCompleted
                      ? "text-emerald-300"
                      : "text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1"
                  }`}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
