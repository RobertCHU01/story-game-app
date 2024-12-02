"use client";


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const storyData = {
  start: {
    id: 'start',
    text: "You're a high school senior who came to the US when you were 3 years old. Your guidance counselor asks about your college plans.",
    choices: [
      { text: "Share that you're undocumented and ask for help", next: 'counselor_help' },
      { text: "Say you're still figuring things out", next: 'avoid_conversation' }
    ]
  },
  counselor_help: {
    id: 'counselor_help',
    text: "Your counselor is supportive and tells you about DACA and specific scholarships for undocumented students.",
    choices: [
      { text: "Apply for DACA and scholarships", next: 'apply_college' },
      { text: "Feel worried about sharing documentation status", next: 'community_college' }
    ]
  },
  avoid_conversation: {
    id: 'avoid_conversation',
    text: "You research college options on your own and discover many schools require citizenship documentation.",
    choices: [
      { text: "Look for community colleges that don't require documentation", next: 'community_college' },
      { text: "Consider taking a gap year to work", next: 'work_decision' }
    ]
  },
  apply_college: {
    id: 'apply_college',
    text: "You get accepted to several colleges! But even with scholarships, the cost is high and federal aid isn't available.",
    choices: [
      { text: "Accept and plan to work part-time", next: 'college_life' },
      { text: "Choose community college to save money", next: 'community_college' }
    ]
  },
  community_college: {
    id: 'community_college',
    text: "At community college, you meet other undocumented students who tell you about resources and support groups.",
    choices: [
      { text: "Join the support group and get involved", next: 'support_network' },
      { text: "Focus solely on studies", next: 'studies_focus' }
    ]
  },
  work_decision: {
    id: 'work_decision',
    text: "Working without documentation limits your options, but you find a restaurant willing to hire you.",
    choices: [
      { text: "Take the job and save for college", next: 'save_college' },
      { text: "Look for other opportunities", next: 'community_college' }
    ]
  },
  college_life: {
    id: 'college_life',
    text: "College is challenging but rewarding. You're excelling in your studies while working 20 hours a week.",
    choices: [
      { text: "Join campus advocacy group", next: 'advocacy' },
      { text: "Keep low profile and focus on grades", next: 'graduation' }
    ]
  },
  support_network: {
    id: 'support_network',
    text: "Through the support group, you learn about legal resources and career opportunities for DACA recipients.",
    choices: [
      { text: "Pursue DACA application", next: 'daca_path' },
      { text: "Continue current path", next: 'graduation' }
    ]
  },
  studies_focus: {
    id: 'studies_focus',
    text: "You focus intensely on your studies and maintain excellent grades.",
    choices: [
      { text: "Apply to transfer to a four-year college", next: 'apply_college' },
      { text: "Continue at community college", next: 'graduation' }
    ]
  },
  save_college: {
    id: 'save_college',
    text: "After a year of working, you've saved some money for college.",
    choices: [
      { text: "Enroll in community college", next: 'community_college' },
      { text: "Continue working to save more", next: 'work_decision' }
    ]
  },
  advocacy: {
    id: 'advocacy',
    text: "You become involved in advocating for undocumented student rights on campus.",
    choices: [
      { text: "Continue advocacy work", next: 'graduation' },
      { text: "Scale back involvement to focus on studies", next: 'graduation' }
    ]
  },
  daca_path: {
    id: 'daca_path',
    text: "You begin the DACA application process with help from legal resources.",
    choices: [
      { text: "Continue education with DACA status", next: 'graduation' },
      { text: "Look for work opportunities", next: 'work_decision' }
    ]
  },
  graduation: {
    id: 'graduation',
    text: "You've reached graduation! Despite the challenges, you've achieved an important milestone.",
    choices: [
      { text: "Start over", next: 'start' }
    ]
  }
};

const StoryGame = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);

  const getCurrentNodeData = () => {
    return storyData[currentNode] || storyData.start;
  };

  const handleChoice = (choice) => {
    if (choice.next) {
      setHistory([...history, currentNode]);
      setCurrentNode(choice.next);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setCurrentNode(previousNode);
      setHistory(history.slice(0, -1));
    }
  };

  const nodeData = getCurrentNodeData();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-4">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Undocumented Student Experience: An Interactive Story</h2>
          <p className="mb-6">{nodeData.text}</p>
          <div className="space-y-4">
            {nodeData.choices && nodeData.choices.map((choice, index) => (
              <Button 
                key={index}
                className="w-full justify-start text-left"
                onClick={() => handleChoice(choice)}
              >
                {choice.text}
              </Button>
            ))}
          </div>
          {history.length > 0 && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={handleBack}
            >
              Go Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryGame;