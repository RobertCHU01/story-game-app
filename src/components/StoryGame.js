"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Different story paths users can choose from
const storyPaths = {
  elementary: {
    id: 'elementary_start',
    title: "Elementary School Years",
    description: "Experience the early school years as a young undocumented student, navigating cultural identity and language barriers.",
  },
  middle: {
    id: 'middle_start',
    title: "Middle School Experience",
    description: "Navigate the challenging middle school years dealing with identity, belonging, and growing awareness of immigration status.",
  },
  high: {
    id: 'high_start',
    title: "High School Journey",
    description: "Face the complexities of high school while managing college preparation and documentation barriers.",
  },
  college: {
    id: 'college_start',
    title: "College Path",
    description: "Experience the journey of pursuing higher education as an undocumented student.",
  }
};

const storyData = {
  // Path Selection
  start: {
    id: 'start',
    text: "Choose a period of the educational journey you want to explore:",
    isPathChoice: true,
    paths: Object.values(storyPaths)
  },

// Elementary School Path detailed expansion
elementary_start: {
    id: 'elementary_start',
    text: "You're in third grade, recently moved to a new school. During morning roll call, your teacher Mrs. Thompson pauses at your name, frowns, and says, 'Oh, this is... different. I'm not sure how to say this.' Some classmates giggle. You've been through this before.",
    choices: [
      { text: "Raise your hand and offer to help pronounce it", next: 'elementary_brave' },
      { text: "Slump in your seat and wait for it to pass", next: 'elementary_quiet' }
    ]
  },
  
  elementary_brave: {
    id: 'elementary_brave',
    text: "You gather your courage and say, 'I can help you say my name. It's important to my family.' Mrs. Thompson seems surprised but interested. A few students turn to look at you with curiosity.",
    choices: [
      { text: "Share the meaning and cultural significance of your name", next: 'elementary_share' },
      { text: "Just teach the pronunciation", next: 'elementary_teach' }
    ]
  },
  
  elementary_share: {
    id: 'elementary_share',
    text: "You explain that your name means 'light' in your language and was chosen to honor your grandmother. Mrs. Thompson smiles warmly and asks if you'd like to share more about your culture with the class. Some students seem genuinely interested.",
    choices: [
      { text: "Share a story about your family traditions", next: 'elementary_culture' },
      { text: "Feel overwhelmed and say 'maybe later'", next: 'elementary_hesitate' }
    ]
  },
  
  elementary_culture: {
    id: 'elementary_culture',
    text: "You tell the class about your favorite holiday celebration at home. As you speak, you notice Maria, another student, nodding excitedly - she celebrates the same way! The teacher suggests doing a cultural sharing day in class.",
    choices: [
      { text: "Volunteer to help organize the cultural day", next: 'elementary_organize' },
      { text: "Feel nervous about drawing more attention", next: 'elementary_nervous' }
    ]
  },
  
  elementary_organize: {
    id: 'elementary_organize',
    text: "Over the next few weeks, you help plan the cultural sharing day. More students open up about their backgrounds. However, when planning permission slips for families to attend, you overhear a conversation about needing 'proper ID' to enter the school building.",
    choices: [
      { text: "Talk to your parents about your concerns", next: 'elementary_parents' },
      { text: "Try to change the ID requirement yourself", next: 'elementary_advocate' }
    ]
  },
  
  elementary_parents: {
    id: 'elementary_parents',
    text: "That evening, you tell your parents about the ID requirement. They look worried but proud of your involvement. Your mom suggests speaking to the teacher about allowing alternative forms of identification, as other parents might have similar concerns.",
    choices: [
      { text: "Speak with Mrs. Thompson privately", next: 'elementary_discuss' },
      { text: "Decide to skip the family invitation", next: 'elementary_skip' }
    ]
  },
  
  elementary_discuss: {
    id: 'elementary_discuss',
    text: "Mrs. Thompson listens carefully to your concerns. She hadn't considered this issue before. 'Thank you for bringing this up,' she says. 'We want all families to feel welcome. Let's work with the principal to find a solution.'",
    choices: [
      { text: "Help create an inclusive solution", next: 'elementary_solution' },
      { text: "Feel relieved but step back from planning", next: 'elementary_relief' }
    ]
  },
  
  elementary_solution: {
    id: 'elementary_solution',
    text: "The school agrees to accept any photo ID, including international ones. The cultural sharing day is a success! Many families attend, sharing food, stories, and traditions. You feel proud seeing your parents there, teaching classmates about your heritage.",
    choices: [
      { text: "Share your success with your family", next: 'elementary_pride' },
      { text: "Start planning the next cultural event", next: 'elementary_future' }
    ]
  },
  
  elementary_pride: {
    id: 'elementary_pride',
    text: "At home, your parents are overjoyed. Your mother hugs you saying, 'You helped make space for our community at your school.' You realize that even small actions can create important changes.",
    choices: [
      { text: "Feel inspired to continue speaking up", next: 'elementary_inspire' },
      { text: "Reflect on your personal growth", next: 'elementary_reflect' }
    ]
  },
  
  // Alternative paths from earlier choices
  
// Elementary School - "Quiet" Path Full Development
elementary_quiet: {
    id: 'elementary_quiet',
    text: "You stay silent as the teacher mispronounces your name. She gives up and says, 'I'll just call you...' shortening your name to an English version. Your stomach tightens as you hear your identity being changed.",
    choices: [
      { text: "Accept the shortened name", next: 'elementary_accept' },
      { text: "Write a note to the teacher later", next: 'elementary_note' }
    ]
  },
  
  elementary_accept: {
    id: 'elementary_accept',
    text: "Days pass with the wrong name. Each time you hear it, you feel a piece of yourself fading. During parent-teacher conferences, your mother hears the teacher use the wrong name and looks at you with concern.",
    choices: [
      { text: "Explain your feelings to your mother", next: 'elementary_open' },
      { text: "Tell her it's not a big deal", next: 'elementary_dismiss' }
    ]
  },
  
  elementary_dismiss: {
    id: 'elementary_dismiss',
    text: "You try to convince your mother it's fine, but she notices you becoming quieter at home. One day, she shares stories about her own struggles with identity when she first came to America.",
    choices: [
      { text: "Open up about your school experiences", next: 'elementary_share_struggle' },
      { text: "Listen but remain reserved", next: 'elementary_reserved' }
    ]
  },
  
  elementary_reserved: {
    id: 'elementary_reserved',
    text: "While staying quiet, you start noticing other students dealing with similar issues. Maria, who sits next to you, is called 'Mary' by teachers. You see her flinch each time, just like you do.",
    choices: [
      { text: "Talk to Maria about shared experiences", next: 'elementary_connect' },
      { text: "Keep observing silently", next: 'elementary_observe' }
    ]
  },
  
  elementary_observe: {
    id: 'elementary_observe',
    text: "As you watch more closely, you realize many students are struggling with cultural identity. A new student arrives who proudly corrects teachers about his name, inspiring others.",
    choices: [
      { text: "Find courage to reclaim your name", next: 'elementary_reclaim' },
      { text: "Support others silently", next: 'elementary_support_others' }
    ]
  },
  
  elementary_support_others: {
    id: 'elementary_support_others',
    text: "You start writing encouraging notes to classmates when they stand up for themselves. Your small acts of kindness create a ripple effect of support in the classroom.",
    choices: [
      { text: "Start a secret support club", next: 'elementary_club' },
      { text: "Share your notes with the teacher", next: 'elementary_share_notes' }
    ]
  },
  
  elementary_share_notes: {
    id: 'elementary_share_notes',
    text: "The teacher reads your thoughtful notes and realizes the impact of name mispronunciation. She proposes a class project about names and their cultural significance.",
    choices: [
      { text: "Help design the project", next: 'elementary_project' },
      { text: "Contribute your story anonymously", next: 'elementary_anonymous' }
    ]
  },
  
  // Continue with more branches...
  
  // [Continue with more scenarios and choices...]

  // Middle School Path
  middle_start: {
    id: 'middle_start',
    text: "It's your first day of 7th grade. You learn about a field trip requiring birth certificates. Your stomach drops, knowing you don't have one from the US.",
    choices: [
      { text: "Talk to your parents about what to do", next: 'middle_parents' },
      { text: "Avoid turning in the permission slip", next: 'middle_avoid' }
    ]
  },

  // High School Path
  high_start: {
    id: 'high_start',
    text: "You're a sophomore in high school. Your friends are excited about getting their driver's licenses, but you know you can't get one due to your status.",
    choices: [
      { text: "Open up to a trusted friend", next: 'high_friend' },
      { text: "Make excuses about not being ready to drive", next: 'high_excuse' }
    ]
  },

  // College Path
  college_start: {
    id: 'college_start',
    text: "Senior year: Your counselor asks about college plans. You're a top student, but FAFSA and financial aid seem impossible without documentation.",
    choices: [
      { text: "Research undocumented student resources", next: 'college_research' },
      { text: "Consider community college options", next: 'college_community' }
    ]
  },
  college_research: {
    id: 'college_research',
    text: "You find organizations supporting undocumented students and learn about special scholarships. However, the process seems overwhelming.",
    choices: [
      { text: "Join an undocumented student support group", next: 'college_support' },
      { text: "Feel discouraged about limited options", next: 'college_discouraged' }
    ]
  },
  college_discouraged: {
    id: 'college_discouraged',
    text: "The weight of your status feels crushing. But then you receive an email about a local organization offering free college counseling for undocumented students.",
    choices: [
      { text: "Reach out for help", next: 'college_reach' },
      { text: "Look into work alternatives", next: 'college_work' }
    ]
  },
  college_reach: {
    id: 'college_reach',
    text: "The counselor introduces you to other undocumented students who are now in college. They share their strategies and success stories.",
    choices: [
      { text: "Apply for special scholarships they recommend", next: 'college_apply' },
      { text: "Join their mentorship program", next: 'college_mentor' }
    ]
  },
  college_work: {
    id: 'college_work',
    text: "While researching work options, you learn about entrepreneurship programs for undocumented youth and college programs that combine work and study.",
    choices: [
      { text: "Explore entrepreneurship opportunities", next: 'college_entrepreneur' },
      { text: "Look into work-study programs", next: 'college_workstudy' }
    ]
  },
  // Add more nodes for each path...
};

const StoryGame = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);
  const [showResources, setShowResources] = useState(false);

  const getCurrentNodeData = () => {
    return storyData[currentNode] || storyData.start;
  };

  const handleChoice = (choice) => {
    if (choice.next) {
      setHistory([...history, currentNode]);
      setCurrentNode(choice.next);
    }
  };

  const handlePathChoice = (pathId) => {
    setHistory([...history, currentNode]);
    setCurrentNode(pathId);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setCurrentNode(previousNode);
      setHistory(history.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentNode('start');
    setHistory([]);
  };

  const nodeData = getCurrentNodeData();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-4">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Undocumented Student Experience: Interactive Stories</h2>
          
          {showResources && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Support Resources</AlertTitle>
              <AlertDescription>
                If you're experiencing similar challenges, these organizations can help:
                <ul className="list-disc pl-4 mt-2">
                  <li>Immigrants Rising - Educational and Entrepreneurship Resources</li>
                  <li>United We Dream - Support Network and Resources</li>
                  <li>TheDream.US - Scholarship Opportunities</li>
                  <li>My Undocumented Life - Blog with Resources and Advice</li>
                  <li>Local Immigrant Youth Organizations - Community Support</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <p className="mb-6">{nodeData.text}</p>
          
          <div className="space-y-4">
            {nodeData.isPathChoice ? (
              nodeData.paths.map((path, index) => (
                <div key={index} className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                     onClick={() => handlePathChoice(path.id)}>
                  <h3 className="font-bold">{path.title}</h3>
                  <p className="text-sm text-gray-600">{path.description}</p>
                </div>
              ))
            ) : (
              nodeData.choices && nodeData.choices.map((choice, index) => (
                <Button 
                  key={index}
                  className="w-full justify-start text-left"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.text}
                </Button>
              ))
            )}
          </div>
          
          <div className="mt-4 space-x-4">
            {history.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                Go Back
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => setShowResources(!showResources)}
            >
              {showResources ? 'Hide Resources' : 'Show Resources'}
            </Button>

            <Button
              variant="outline"
              onClick={handleRestart}
            >
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryGame;