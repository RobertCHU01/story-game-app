"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  start: {
    id: 'start',
    text: "Choose a period of the educational journey you want to explore:",
    isPathChoice: true,
    paths: Object.values(storyPaths)
  },

  // Elementary School Path - Expanded to 20+ nodes
  elementary_start: {
    id: 'elementary_start',
    text: "You're in third grade, recently moved to a new school. During morning roll call, your teacher Mrs. Thompson pauses at your name, frowns, and says, 'Oh, this is... different. I'm not sure how to say this.' Some classmates giggle. You've been through this before.",
    choices: [
      { text: "Raise your hand and offer to help pronounce it", next: 'elementary_brave' },
      { text: "Slump in your seat and wait for it to pass", next: 'elementary_quiet' }
    ]
  },

  elementary_brave: {
    text: "You gather your courage and say, 'I can help you say my name. It's important to my family.' Mrs. Thompson seems surprised but interested. A few students turn to look at you with curiosity.",
    choices: [
      { text: "Share the meaning and cultural significance of your name", next: 'elementary_share' },
      { text: "Just teach the pronunciation", next: 'elementary_teach' }
    ]
  },

  elementary_share: {
    text: "You explain that your name means 'light' in your language and was chosen to honor your grandmother. Mrs. Thompson smiles warmly and asks if you'd like to share more about your culture with the class. Some students seem genuinely interested.",
    choices: [
      { text: "Share a story about your family traditions", next: 'elementary_culture' },
      { text: "Feel overwhelmed and say 'maybe later'", next: 'elementary_hesitate' }
    ]
  },

  elementary_culture: {
    text: "You tell the class about your favorite holiday celebration at home. As you speak, you notice Maria, another student, nodding excitedly - she celebrates the same way! The teacher suggests doing a cultural sharing day in class.",
    choices: [
      { text: "Volunteer to help organize the cultural day", next: 'elementary_organize' },
      { text: "Feel nervous about drawing more attention", next: 'elementary_nervous' }
    ]
  },

  elementary_organize: {
    text: "You help plan the cultural sharing day with enthusiasm. The whole class gets involved in the preparations, and you feel proud seeing your classmates interested in learning about different traditions.",
    choices: [
      { text: "Propose inviting families to participate", next: 'elementary_families' },
      { text: "Focus on student presentations", next: 'elementary_presentations' }
    ]
  },

  elementary_families: {
    text: "While planning permission slips for families to attend, you overhear a conversation about needing 'proper ID' to enter the school building. Your heart sinks, knowing this could prevent some families from participating.",
    choices: [
      { text: "Talk to your parents about your concerns", next: 'elementary_parents_concern' },
      { text: "Speak privately with Mrs. Thompson", next: 'elementary_teacher_private' }
    ]
  },

  elementary_teacher_private: {
    text: "After class, you approach Mrs. Thompson and explain your concerns about the ID requirement. She listens thoughtfully and says, 'I hadn't considered that. Thank you for bringing this up. Let's find a solution that works for everyone.'",
    choices: [
      { text: "Suggest alternative forms of identification", next: 'elementary_alternative_id' },
      { text: "Propose holding the event outside school hours", next: 'elementary_outside_hours' }
    ]
  },

  elementary_alternative_id: {
    text: "You and Mrs. Thompson work together to create a list of acceptable identification options, including library cards and utility bills. The principal approves the changes, making the event more accessible to all families.",
    choices: [
      { text: "Feel proud of making a difference", next: 'elementary_pride' },
      { text: "Share the news with other families", next: 'elementary_share_news' }
    ]
  },

  elementary_pride: {
    text: "The cultural sharing day is a huge success. Many families attend, sharing food, stories, and traditions. You feel proud seeing your parents there, teaching your classmates about your heritage.",
    choices: [
      { text: "Suggest making it an annual event", next: 'elementary_annual' },
      { text: "Thank Mrs. Thompson for her support", next: 'elementary_gratitude' }
    ]
  },

  elementary_annual: {
    text: "Your suggestion to make the cultural sharing day an annual event is met with enthusiasm. Mrs. Thompson asks you to help create a guide for future classes to continue the tradition.",
    choices: [
      { text: "Begin documenting the planning process", next: 'elementary_document' },
      { text: "Form a student committee", next: 'elementary_committee' }
    ]
  },

  elementary_document: {
    text: "You start creating a detailed guide with suggestions for inclusive ID policies, food sharing guidelines, and presentation ideas. Your experience helps make the document more considerate of all families' situations.",
    choices: [
      { text: "Add a section about cultural sensitivity", next: 'elementary_sensitivity' },
      { text: "Focus on practical logistics", next: 'elementary_logistics' }
    ]
  },

  elementary_sensitivity: {
    text: "Your section on cultural sensitivity includes tips about name pronunciation, respecting different traditions, and making everyone feel welcome. The principal is so impressed, she wants to share it with other teachers.",
    choices: [
      { text: "Present the guide at a staff meeting", next: 'elementary_present' },
      { text: "Create a student-friendly version", next: 'elementary_student_version' }
    ]
  },

  elementary_present: {
    text: "At the staff meeting, teachers are moved by your thoughtful presentation. Many share their own stories of struggling with cultural inclusion, and they thank you for helping them understand their students better.",
    choices: [
      { text: "Volunteer to help train other students", next: 'elementary_train' },
      { text: "Work on expanding the program", next: 'elementary_expand' }
    ]
  },

  elementary_train: {
    text: "You begin working with other students who want to be cultural ambassadors in their classrooms. Together, you create presentations and activities that help celebrate diversity.",
    choices: [
      { text: "Start a cultural awareness club", next: 'elementary_club' },
      { text: "Focus on peer mentoring", next: 'elementary_mentor' }
    ]
  },

  elementary_club: {
    text: "The cultural awareness club becomes a popular lunch-time activity. Students share stories, teach words from their languages, and plan mini-celebrations throughout the year.",
    choices: [
      { text: "Organize an international food festival", next: 'elementary_festival' },
      { text: "Create a multicultural art project", next: 'elementary_art' }
    ]
  },

  elementary_festival: {
    text: "The international food festival brings together the entire school community. Families share traditional dishes, and students learn about the cultural significance of different foods.",
    choices: [
      { text: "Create a school cookbook", next: 'elementary_cookbook' },
      { text: "Plan cultural performances", next: 'elementary_performances' }
    ]
  },

  elementary_cookbook: {
    text: "The school cookbook project becomes a treasured collection of family recipes and stories. Each recipe includes a note about its cultural significance and family history.",
    choices: [
      { text: "Share copies with the community", next: 'elementary_share_cookbook' },
      { text: "Plan a cooking demonstration day", next: 'elementary_cooking' }
    ]
  },

  elementary_share_cookbook: {
    text: "The cookbook is a huge hit! Local libraries request copies, and other schools want to start similar projects. Your small idea has grown into something that brings the whole community together.",
    choices: [
      { text: "Begin planning next year's edition", next: 'elementary_next_year' },
      { text: "Mentor other schools", next: 'elementary_mentor_schools' }
    ]
  },

  elementary_next_year: {
    text: "As you plan the next edition of the cookbook, you realize how much has changed since that first day when Mrs. Thompson struggled with your name. Your courage in speaking up has helped create a more inclusive school community.",
    choices: [
      { text: "Reflect on your journey", next: 'elementary_reflect' },
      { text: "Look forward to new challenges", next: 'elementary_future' }
    ]
  },

  // Middle School Path - Adding similar depth
  middle_start: {
    text: "It's your first day of 7th grade. You learn about a field trip requiring birth certificates. Your stomach drops, knowing you don't have one from the US.",
    choices: [
      { text: "Talk to your parents about what to do", next: 'middle_parents' },
      { text: "Avoid turning in the permission slip", next: 'middle_avoid' }
    ]
  },


  middle_parents: {
    text: "You tell your parents about the field trip requirement. They look worried but encourage you to speak with the teacher. 'We'll find a way to make this work,' your dad says, though you can see his concern.",
    choices: [
      { text: "Approach the teacher together", next: 'middle_teacher_meeting' },
      { text: "Look for alternative documents", next: 'middle_documents' }
    ]
  },
  
  middle_teacher_meeting: {
    text: "Your parents meet with your teacher after school. They explain your situation carefully. The teacher listens attentively and says she'll speak with the administration about alternatives.",
    choices: [
      { text: "Wait anxiously for a response", next: 'middle_waiting' },
      { text: "Suggest using other forms of ID", next: 'middle_alternative_id' }
    ]
  },
  
  middle_waiting: {
    text: "Days pass, and the anxiety builds. You see other students turning in their permission slips. Finally, your teacher asks to speak with you privately after class.",
    choices: [
      { text: "Feel hopeful about a solution", next: 'middle_hope' },
      { text: "Prepare for disappointment", next: 'middle_prepare' }
    ]
  },
  
  middle_hope: {
    text: "The teacher explains that the school will accept alternative documentation. She seems genuinely happy to help, saying 'We want all our students to participate in these experiences.'",
    choices: [
      { text: "Express gratitude for her support", next: 'middle_gratitude' },
      { text: "Ask about future field trips", next: 'middle_future_trips' }
    ]
  },
  
  middle_documents: {
    text: "Your parents suggest using your passport from your home country or school records as alternative documentation. You're nervous about revealing too much about your status.",
    choices: [
      { text: "Try using the school ID", next: 'middle_school_id' },
      { text: "Show the foreign passport", next: 'middle_passport' }
    ]
  },
  
  middle_school_id: {
    text: "You present your school ID as documentation. The teacher seems unsure and consults with the principal. The waiting makes your heart race.",
    choices: [
      { text: "Share your concerns with a counselor", next: 'middle_counselor' },
      { text: "Consider skipping the trip", next: 'middle_skip' }
    ]
  },
  
  middle_counselor: {
    text: "The school counselor listens to your situation with empathy. She reveals that other students have faced similar challenges and there are established alternative procedures.",
    choices: [
      { text: "Feel relieved about the support", next: 'middle_relief' },
      { text: "Ask about connecting with other students", next: 'middle_connect' }
    ]
  },
  
  middle_connect: {
    text: "The counselor mentions a student support group that meets during lunch. 'It's a safe space to share experiences and help each other,' she explains.",
    choices: [
      { text: "Join the support group", next: 'middle_support_group' },
      { text: "Take time to think about it", next: 'middle_consider' }
    ]
  },
  
  middle_support_group: {
    text: "At the group meeting, you meet other students who understand your experiences. For the first time, you don't feel alone in your struggles.",
    choices: [
      { text: "Share your field trip story", next: 'middle_share_story' },
      { text: "Listen to others' experiences", next: 'middle_listen' }
    ]
  },
  
  middle_share_story: {
    text: "As you share your story, others nod in understanding. One student shares how they successfully navigated a similar situation last year.",
    choices: [
      { text: "Take notes on their strategies", next: 'middle_strategies' },
      { text: "Offer to help others in future", next: 'middle_help_others' }
    ]
  },
  
  middle_help_others: {
    text: "You decide to help other students facing similar challenges. Working with the counselor, you create a resource guide for navigating school activities.",
    choices: [
      { text: "Include different documentation options", next: 'middle_documentation_guide' },
      { text: "Focus on emotional support tips", next: 'middle_emotional_support' }
    ]
  },
  
  middle_strategies: {
    text: "The group shares various strategies they've used: from talking to understanding teachers to finding creative solutions for different school requirements.",
    choices: [
      { text: "Start documenting these tips", next: 'middle_document_tips' },
      { text: "Share with your parents", next: 'middle_share_parents' }
    ]
  },
  
  middle_document_tips: {
    text: "You create a private notebook of helpful tips and resources. Other students ask if they can contribute their own experiences and advice.",
    choices: [
      { text: "Organize a resource-sharing session", next: 'middle_resource_session' },
      { text: "Keep the information confidential", next: 'middle_confidential' }
    ]
  },
  
  middle_resource_session: {
    text: "The resource-sharing session becomes a powerful moment of community building. Students share not just challenges, but also successes and dreams.",
    choices: [
      { text: "Propose regular meetings", next: 'middle_regular_meetings' },
      { text: "Create an anonymous tip box", next: 'middle_tip_box' }
    ]
  },
  
  middle_regular_meetings: {
    text: "The group begins meeting regularly, becoming a vital support network. You discuss everything from school challenges to cultural celebrations.",
    choices: [
      { text: "Start a mentorship program", next: 'middle_mentorship' },
      { text: "Plan community outreach", next: 'middle_outreach' }
    ]
  },
  
  middle_mentorship: {
    text: "The mentorship program pairs older students with younger ones, creating a support system that extends beyond immediate challenges.",
    choices: [
      { text: "Become a mentor", next: 'middle_mentor_role' },
      { text: "Coordinate the program", next: 'middle_coordinate' }
    ]
  },
  
  middle_mentor_role: {
    text: "As a mentor, you help a sixth grader navigate similar challenges you faced. It feels empowering to turn your difficult experiences into guidance for others.",
    choices: [
      { text: "Share success strategies", next: 'middle_success' },
      { text: "Focus on emotional support", next: 'middle_emotional' }
    ]
  },
  
  // High School path expansion...
  
  high_start: {
    text: "You're a sophomore in high school. Your friends are excited about getting their driver's licenses, but you know you can't get one due to your status.",
    choices: [
      { text: "Open up to a trusted friend", next: 'high_friend_trust' },
      { text: "Make excuses about not being ready", next: 'high_excuses' }
    ]
  },
  
  high_friend_trust: {
    text: "You decide to confide in your best friend about why you can't get a license. Your heart pounds as you carefully explain your situation.",
    choices: [
      { text: "Share your full story", next: 'high_full_story' },
      { text: "Keep some details private", next: 'high_private' }
    ]
  },
  
  high_full_story: {
    text: "Your friend listens with compassion and asks thoughtful questions. They offer to help research alternative transportation options and want to understand how to be supportive.",
    choices: [
      { text: "Plan transportation together", next: 'high_transportation' },
      { text: "Express gratitude for support", next: 'high_gratitude' }
    ]
  },
  
  high_transportation: {
    text: "Together, you research bus routes, bike paths, and carpooling options. Your friend offers to pick you up for school activities when possible.",
    choices: [
      { text: "Accept the help graciously", next: 'high_accept_help' },
      { text: "Worry about being a burden", next: 'high_worry' }
    ]
  },

  high_accept_help: {
    text: "Your friend's support makes school activities more manageable. As you spend more time together, they start to understand the daily challenges you face.",
    choices: [
      { text: "Share more about your experiences", next: 'high_experiences' },
      { text: "Focus on current challenges", next: 'high_challenges' }
    ]
  },
  
  high_experiences: {
    text: "You share stories about growing up undocumented - the constant anxiety, the careful planning needed for simple tasks. Your friend listens intently, wanting to understand.",
    choices: [
      { text: "Discuss college preparation concerns", next: 'high_college_prep' },
      { text: "Talk about family sacrifices", next: 'high_family_sacrifices' }
    ]
  },
  
  high_college_prep: {
    text: "During college prep discussions in class, you feel overwhelmed. The counselor talks about FAFSA and financial aid, but you know these aren't options for you.",
    choices: [
      { text: "Research alternative funding options", next: 'high_funding' },
      { text: "Meet privately with the counselor", next: 'high_counselor_meeting' }
    ]
  },
  
  high_counselor_meeting: {
    text: "The counselor turns out to be knowledgeable about resources for undocumented students. She shares information about private scholarships and supportive colleges.",
    choices: [
      { text: "Start researching scholarships", next: 'high_scholarships' },
      { text: "Ask about student support groups", next: 'high_support_groups' }
    ]
  },
  
  high_scholarships: {
    text: "You discover several scholarships specifically for undocumented students. Some even cover full tuition. Hope begins to replace your anxiety about college.",
    choices: [
      { text: "Begin application process", next: 'high_applications' },
      { text: "Share information with others", next: 'high_share_info' }
    ]
  },
  
  high_applications: {
    text: "As you work on scholarship applications, your personal essays become a powerful way to share your story. You write about resilience, family, and dreams.",
    choices: [
      { text: "Focus on academic achievements", next: 'high_academics' },
      { text: "Emphasize community involvement", next: 'high_community' }
    ]
  },
  
  high_community: {
    text: "Your community involvement has grown since joining the student support group. You've become an advocate, helping other undocumented students navigate high school.",
    choices: [
      { text: "Organize an information session", next: 'high_info_session' },
      { text: "Create a resource guide", next: 'high_resource_guide' }
    ]
  },
  
  high_info_session: {
    text: "The information session draws more students than expected. Many are surprised to learn about the challenges undocumented students face and want to help.",
    choices: [
      { text: "Form an ally support network", next: 'high_ally_network' },
      { text: "Plan regular awareness events", next: 'high_awareness' }
    ]
  },
  
  high_ally_network: {
    text: "The ally network grows quickly. Students and teachers join, offering support from tutoring to transportation. You're creating real change in your school.",
    choices: [
      { text: "Expand to other schools", next: 'high_expand' },
      { text: "Focus on policy advocacy", next: 'high_advocacy' }
    ]
  },
  
  // College path expansion...
  
  college_start: {
    text: "Senior year: Your counselor asks about college plans. You're a top student, but FAFSA and federal financial aid seem impossible without documentation.",
    choices: [
      { text: "Research undocumented student resources", next: 'college_research' },
      { text: "Consider community college options", next: 'college_community' }
    ]
  },
  
  college_research: {
    text: "You discover organizations supporting undocumented students with college access. There are more resources than you expected, but navigating them seems overwhelming.",
    choices: [
      { text: "Join an undocumented student group", next: 'college_student_group' },
      { text: "Meet with an education advocate", next: 'college_advocate' }
    ]
  },
  
  college_student_group: {
    text: "The student group becomes a lifeline. Current college students share their experiences and strategies for navigating higher education while undocumented.",
    choices: [
      { text: "Learn about scholarship opportunities", next: 'college_opportunities' },
      { text: "Focus on admission strategies", next: 'college_strategies' }
    ]
  },
  
  college_opportunities: {
    text: "You learn about private scholarships, institutional aid, and state-specific programs. Some colleges have funds specifically for undocumented students.",
    choices: [
      { text: "Apply for multiple scholarships", next: 'college_apply_scholarships' },
      { text: "Research college-specific aid", next: 'college_institutional_aid' }
    ]
  },
  
  college_apply_scholarships: {
    text: "The scholarship application process is intense. Each essay requires you to reflect deeply on your experiences, challenges, and aspirations.",
    choices: [
      { text: "Share your family's story", next: 'college_family_story' },
      { text: "Focus on academic goals", next: 'college_goals' }
    ]
  },
  
  college_family_story: {
    text: "Writing about your family's journey is emotional but powerful. You describe their sacrifices, their courage, and their dreams for your education.",
    choices: [
      { text: "Include community impact", next: 'college_impact' },
      { text: "Highlight personal growth", next: 'college_growth' }
    ]
  },
  
  college_impact: {
    text: "You describe how your experiences have inspired you to help others. Your work with the support group and advocacy efforts demonstrate leadership.",
    choices: [
      { text: "Include future career goals", next: 'college_career' },
      { text: "Emphasize community service", next: 'college_service' }
    ]
  },
  
  college_career: {
    text: "Your career goals are shaped by your experiences. You want to become an immigration lawyer, education advocate, or community organizer.",
    choices: [
      { text: "Research career pathways", next: 'college_pathways' },
      { text: "Seek professional mentors", next: 'college_mentors' }
    ]
  },
  
  college_pathways: {
    text: "You discover various career paths that align with your goals. Some successful professionals were once undocumented students themselves.",
    choices: [
      { text: "Connect with potential mentors", next: 'college_connect' },
      { text: "Join professional networks", next: 'college_networks' }
    ]
  },
  
  college_connect: {
    text: "A mentor who was once undocumented shares their journey to becoming a lawyer. Their story gives you hope and practical guidance.",
    choices: [
      { text: "Plan your academic path", next: 'college_academic_plan' },
      { text: "Discuss advocacy opportunities", next: 'college_advocate_opps' }
    ]
  },
  

  college_academic_plan: {
    text: "With your mentor's guidance, you map out your academic journey. You'll start with pre-law courses while building your advocacy experience through campus organizations.",
    choices: [
      { text: "Join pre-law student association", next: 'college_prelaw' },
      { text: "Focus on immigrant rights advocacy", next: 'college_rights' }
    ]
  },
  
  college_prelaw: {
    text: "The pre-law association welcomes you warmly. You're surprised to meet another undocumented student who's graduating this year and heading to law school.",
    choices: [
      { text: "Ask about their law school journey", next: 'college_law_journey' },
      { text: "Share your own aspirations", next: 'college_aspirations' }
    ]
  },
  
  college_law_journey: {
    text: "They share invaluable insights about navigating law school applications as an undocumented student, including specific schools with supportive policies and private funding options.",
    choices: [
      { text: "Take detailed notes for future", next: 'college_notes' },
      { text: "Offer to help other students", next: 'college_help_others' }
    ]
  },
  
  college_help_others: {
    text: "You start a study group specifically for undocumented pre-law students. Word spreads, and soon students from other majors ask about starting similar groups.",
    choices: [
      { text: "Expand to other disciplines", next: 'college_expand' },
      { text: "Create a resource handbook", next: 'college_handbook' }
    ]
  },
  
  college_expand: {
    text: "The study groups evolve into a campus-wide support network. You organize workshops on navigating higher education, career planning, and maintaining mental health as an undocumented student.",
    choices: [
      { text: "Develop leadership training", next: 'college_leadership' },
      { text: "Focus on emotional support", next: 'college_emotional' }
    ]
  },
  
  college_leadership: {
    text: "Your leadership program helps undocumented students build confidence and advocacy skills. The university takes notice and offers institutional support.",
    choices: [
      { text: "Propose a dedicated center", next: 'college_center' },
      { text: "Create peer mentoring system", next: 'college_peer_mentor' }
    ]
  },
  
  college_center: {
    text: "Working with administration, you help establish an Undocumented Student Resource Center. It's a safe space offering legal aid, counseling, and academic support.",
    choices: [
      { text: "Develop new programs", next: 'college_programs' },
      { text: "Share model with other schools", next: 'college_share_model' }
    ]
  },
  
  college_programs: {
    text: "The center launches innovative programs including emergency financial aid, career counseling, and family support services. Other universities begin reaching out to learn from your model.",
    choices: [
      { text: "Present at national conference", next: 'college_conference' },
      { text: "Write policy recommendations", next: 'college_policy' }
    ]
  },
  
  college_conference: {
    text: "At the conference, you share your journey from scared high school student to campus leader. Your presentation inspires other schools to create similar support systems.",
    choices: [
      { text: "Build national network", next: 'college_network' },
      { text: "Focus on local impact", next: 'college_local' }
    ]
  },
  
  college_network: {
    text: "The national network grows rapidly, connecting undocumented student centers across the country. You're creating lasting change in higher education.",
    choices: [
      { text: "Plan national campaign", next: 'college_campaign' },
      { text: "Document success stories", next: 'college_stories' }
    ]
  },
  
  college_campaign: {
    text: "Your campaign brings national attention to undocumented students' achievements and contributions. More institutions commit to creating supportive policies.",
    choices: [
      { text: "Celebrate progress made", next: 'college_progress' },
      { text: "Look toward future goals", next: 'college_future' }
    ]
  },
  
  // End points based on different paths
  
  college_progress: {
    text: "As graduation approaches, you reflect on your journey. From that scared student worried about college access, you've become a leader who's helped create systemic change. Your resource center will continue supporting future students, and your advocacy work has helped establish new policies and programs. While challenges remain, you've helped build a more inclusive and supportive educational system.",
    choices: [
      { text: "Begin your legal career journey", next: 'ending_legal' },
      { text: "Continue education advocacy", next: 'ending_advocacy' }
    ]
  },
  
  ending_legal: {
    text: "You graduate with honors and acceptance to law school. Your experiences have shaped your passion for immigration law, and you look forward to continuing your advocacy work as a future attorney. Though the path wasn't easy, you've shown that with determination and support, undocumented students can achieve their dreams while creating positive change for others. THE END",
    choices: [
      { text: "Start Over", next: 'start' }
    ]
  },
  
  ending_advocacy: {
    text: "Your graduation marks a new chapter in your advocacy work. The networks and programs you've helped build will support future generations of undocumented students. As you move into a leadership role in education policy, you carry with you the stories and strength of your community. You've transformed personal challenges into systemic change, creating pathways for others to follow. THE END",
    choices: [
      { text: "Start Over", next: 'start' }
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