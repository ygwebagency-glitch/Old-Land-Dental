import type { ImageKey } from "@/config/images";

export type Clinician = {
  id: string;
  name: string;
  role: string;
  qualifications?: string;
  gdc?: string;
  image: ImageKey;
  bio: string[];
};

export const dentists: Clinician[] = [
  {
    id: "katie-davies",
    name: "Katie Davies",
    role: "Dental Surgeon",
    qualifications: "BDS DPDS PG CERT",
    gdc: "73097",
    image: "team.katie",
    bio: [
      "Katie qualified from Bristol University in 1997 with a Bachelor in Dental Surgery. She worked as an associate for 5 years before setting up Oldland Dental Practice in 2003 as the Principal Dentist. In 2001 she gained her Diploma in Postgraduate Dental Studies having studied in Prosthetics, Paedodontics and Endodontics.",
      "Katie has always worked in general practice, and enjoys the variation and challenges working in practice brings but has an interest in Childrens Dentistry.",
      "Katie also contributes to Dental Education. Since 2006 she has been an Educational Supervisor and helps train newly qualified Foundation Dentists working in general practice. In 2012, she gained a Postgraduate Certificate in Dental Education.",
      "Originally from South West Wales, Katie is fluent in Welsh and enjoys cooking, gardening and spending time with her daughter Megan.",
    ],
  },
  {
    id: "lucy-beard",
    name: "Lucy Beard",
    role: "Dental Surgeon",
    qualifications: "BDS",
    gdc: "192425",
    image: "team.lucy",
    bio: [
      "Originally from Newport in South Wales, Lucy qualified from Leeds University in 2010. The following year she completed her Vocational Training alongside achieving an MJDF qualification from the Royal College of Surgeons. In 2017 Lucy was appointed as an Education Supervisor, which involved mentoring newly qualified, Foundation Dentists.",
      "Lucy joined Oldland Dental Practice in 2022. Since then, she has been focusing more on postgraduate studies and hopes to complete a Diploma in Restorative and Cosmetic Dentistry by 2024. She has trained in clear aligner therapy, and is also training in Invisalign.",
      "Lucy enjoys all aspects of dentistry but particularly enjoys cosmetic composite work; working with anxious patients and children.",
      "Outside of work, aside from being Mum to gorgeous Fred and Harry, Lucy loves playing netball, gardening, camping and hiking.",
    ],
  },
  {
    id: "kiran-naik",
    name: "Kiran Naik",
    role: "Dental Surgeon",
    gdc: "114049",
    image: "team.kiran",
    bio: [
      "Kiran qualified from Leeds University in 2007.",
      "Primarily working in the South West, Kiran has held posts in both hospital and general practice. In 2011, he received Membership of joint dental faculties from the Royal college of surgeons.",
      "Kiran enjoys all aspects of dentistry but in particular the challenge of replacing missing teeth.",
      "When not being kept busy by his children, he enjoys playing tennis and walking the family dog.",
    ],
  },
  {
    id: "federico-zanutto",
    name: "Federico Zanutto",
    role: "Dental Surgeon",
    image: "team.federico",
    bio: [
      "Federico was born in Italy and qualified from the University of Trieste in 2005. Previously he worked at Trieste Dental Hospital and various private practices in Italy while in 2006 he volunteered in Imperatriz, Brazil.",
      "In 2007, he took the decision to relocate to Bath, where he has have settled with his family. Since then, he worked in different dental practices in Wiltshire and Somerset until he joined Oldland Dental Practice in 2024.",
      "Federico strongly believes in modern and evidence based dentistry, offering all aspects of general dentistry. Some years ago, however, he started to develop a greater interest in Endodontics (Root Canal Treatments) and for this reason, in 2016, he has started a 3 year Master degree in Clinical Endodontics at the University of South Wales which he completed in 2019 with Distinction.",
      "This reflects his wish to deliver a high standard of care to the patients, with particular focus on Endodontics, and ensure they are treated in a professional and welcoming way.",
      "In his spare time, he enjoys doing outdoor and cultural activities with his family, watching art films, listening to music and reading.",
    ],
  },
  {
    id: "manisha-mehendale",
    name: "Manisha Mehendale",
    role: "Dental Surgeon",
    qualifications: "BDS (India), MFDS RCPS PGCERT (Dental Education)",
    gdc: "85019",
    image: "team.manisha",
    bio: [
      "Born and raised in India, Manisha graduated with her Bachelor of Dental Surgery in 1998, and received Membership of the Faculty of Dental Surgeons from the Royal College of Surgeons in Glasgow in 2004.",
      "Manisha has been working in general practice for 21 years, with a strong emphasis on holistic, patient centric care and minimal intervention conservative Dentistry. She is passionate about clinical dentistry and has continued to upskill throughout her career. She enjoys all aspects of general dental practice, but especially enjoys doing root canals and crowns to save teeth and aesthetic Smile makeovers to improve patient confidence and well-being.",
      "Manisha became an Educational Supervisor for Foundation Dentists in 2015, discovering a passion for Teaching and Education. This lead to her completing a Diploma in Teaching and Learning for Healthcare Professionals, and later assuming the role of Training Programme Director for the Somerset Dental Foundational Training Scheme in 2019. She is also beginning her 4th year working as Senior Clinical Lecturer and Joint-Head of the General Practice Unit at Bristol University's Dental School.",
      "Manisha loves reading, travel, coffee, and spending time with her husband and daughter. Manisha is also an avid musician, and outside of work can often be found singing both at home and on stage.",
    ],
  },
  {
    id: "lois-newlands",
    name: "Lois Newlands",
    role: "Dental Surgeon",
    qualifications: "BDS",
    gdc: "309355",
    image: "team.lois",
    bio: [
      "Lois is from Suffolk and graduated from Sheffield in 2023. She enjoys all aspects of dentistry but particularly restorative dentistry and working with patients to create a relaxed environment.",
      "Outside of dentistry, Lois enjoys running and going to the gym, often rewarding herself with a coffee afterwards",
    ],
  },
  {
    id: "nicole-kasiya",
    name: "Nicole Kasiya",
    role: "Dental Surgeon",
    qualifications: "BDS",
    gdc: "336215",
    image: "team.nicole",
    bio: [
      "Originally from Bath, Nicole graduated from the University of Manchester in 2026 with a Bachelor of Dental Surgery. She is delighted to be returning to Bath to begin her career in general dental practice.",
      "Nicole enjoys all aspects of dentistry, with a particular interest in paediatric dentistry. She is passionate about providing gentle, friendly and personalised care, helping patients feel comfortable and confident throughout their dental journey.",
      "Outside of dentistry, Nicole enjoys travelling, keeping active and spending time with family and friends.",
    ],
  },
];

export const hygienist: Clinician = {
  id: "alla-king",
  name: "Alla King",
  role: "Dental Hygienist",
  gdc: "112021",
  image: "team.alla",
  bio: [
    "Alla qualified from Bristol University as a Dental Hygienist in June 2012. Before joining the established Oldland team in 2019, Alla has been working in busy NHS/private/Denplan dental practices in Bristol and South Gloucestershire.",
    "Alla loves her job as a Dental Hygienist in which she helps patients to improve and maintain their oral health. She helps to develop personal effective home oral care regime. Also, under the treatment plan from the dentist, she treats periodontal disease to prevent it from progression which may lead to a tooth loss.",
    "Outside of work Alla loves growing Koi-fish and fish-pond plants. She enjoys meeting with friends and visiting places as well as the solitude of fine needlework, especially knitting.",
  ],
};

export const nurses: { name: string; gdc: string }[] = [
  { name: "Tracy J Worlock", gdc: "208186" },
  { name: "Helen Reed", gdc: "117366" },
  { name: "Tracy A Worlock", gdc: "256879" },
  { name: "Charlotte Yeatman", gdc: "294326" },
  { name: "Ashton Morris", gdc: "294245" },
  { name: "Molly Nicholson", gdc: "325718" },
  { name: "Lauren Sako", gdc: "330962" },
  { name: "Heidi Zinkant", gdc: "131436" },
  { name: "Amy Jones", gdc: "311243" },
];

export const administration: string[] = ["Jackie Payne", "Gail Burleton", "Amy Filer", "Julie Evans"];
