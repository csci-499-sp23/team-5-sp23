import React from 'react';
import ".././css/PersonalityPage.css";
import math from "math";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import GoogleAPI from ".././GoogleAPI.js"

export const mbtiTypes = {
  "ISTJ": 
  {
    description: "Practical and logical, with a focus on order and structure.",
    weights: {'I': 2, 'S': 2, 'T': 2, 'J': 2}
  },
  "ISFJ":
  {
    description:
    "Warm and responsible, with a focus on tradition and stability.",
    weights: {'I': 2, 'S': 2, 'F': 2, 'J': 2} 
  },
  "INFJ":
  {
    description:
    "Insightful and compassionate, with a focus on understanding and harmony.",
    weights: {'I': 2, 'N': 2, 'F': 2, 'J': 2} 
  },
  "INTJ":
  {
    description:
    "Strategic and analytical, with a focus on long-term vision and planning.",
    weights: {'I': 2, 'N': 2, 'T': 2, 'J': 2} 
  },
  "ISTP":
  {
    description: "Bold and practical, with a focus on action and results.",
    weights: {'I': 2, 'S': 2, 'T': 2, 'P': 2} 
  },
  "ISFP":
  {
    description:
    "Creative and sensitive, with a focus on aesthetics and values.",
    weights: {'I': 2, 'S': 2, 'F': 2, 'P': 2} 
  },
  "INFP":
  {
    description:
    "Idealistic and empathetic, with a focus on personal growth and meaning.",
    weights: {'I': 2, 'N': 2, 'F': 2, 'P': 2} 
  },
  "INTP":
  {
    description:
    "Inventive and curious, with a focus on analysis and innovation.",
    weights: {'I': 2, 'N': 2, 'T': 2, 'P': 2} 
  },
  "ESTP":
  {
    description:
    "Energetic and adaptable, with a focus on seizing opportunities.",
    weights: {'E': 2, 'S': 2, 'T': 2, 'P': 2} 
  },
  "ESFP":
  {
    description:
    "Spontaneous and enthusiastic, with a focus on fun and excitement.",
    weights: {'E': 2, 'S': 2, 'F': 2, 'P': 2} 
  },
  "ENFP":
  {
    description:
    "Creative and enthusiastic, with a focus on possibilities and connections.",
    weights: {'E': 2, 'N': 2, 'F': 2, 'P': 2} 
  },
  "ENTP":
  {
    description:
    "Innovative and adaptable, with a focus on new ideas and challenges.",
    weights: {'E': 2, 'N': 2, 'T': 2, 'P': 2} 
  },
  "ESTJ":
  {
    description:
    "Efficient and practical, with a focus on organization and control.",
    weights: {'E': 2, 'S': 2, 'T': 2, 'J': 2} 
  },
  "ESFJ":
  {
    description:
    "Friendly and conscientious, with a focus on harmony and social connections.",
    weights: {'E': 2, 'S': 2, 'F': 2, 'J': 2} 
  },
  "ENFJ":
  {
    description:
    "Charismatic and empathetic, with a focus on inspiring and leading others.",
    weights: {'E': 2, 'N': 2, 'F': 2, 'J': 2} 
  },
  "ENTJ":
  {
    description:
    "Assertive and visionary, with a focus on strategic planning and leadership.",
    weights: {'E': 2, 'N': 2, 'T': 2, 'J': 2} 
  },
};

export const dateOptions = {
  'amusement_park': {'E': 2, 'N': 1, 'F': 1, 'P': 0},
  'aquarium': {'E': 1, 'S': 1, 'T': 1, 'P': 1},
  'art_gallery': {'E': 2, 'N': 2, 'F': 2, 'P': 1},
  'bakery': {'E': 1, 'S': 1, 'F': 1, 'P': 0},
  'bar': {'E': 2, 'N': 1, 'F': 1, 'P': 2},
  'bicycle_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'book_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'bowling_alley': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'cafe': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'campground': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'casino': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'church': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'clothing_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'department_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'florist': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'gym': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'hair_care': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'library': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'meal_delivery': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'meal_takeaway': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'mosque': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'movie_rental': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'movie_theater': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'museum': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'park': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'pet_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'restaurant': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'shoe_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'shopping_mall': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'spa': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'stadium': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'synagogue': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'tourist_attraction': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'university': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'zoo': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
}

function similarity(personality, dateOption) {
  const pChars = mbtiTypes[personality].weights;
  // const dChars = dateOption;
  const { date, ...rest } = dateOption;
  const dChars = rest;

  const dotProduct = Object.keys(pChars)
    .filter((k) => dChars[k])
    .reduce((acc, k) => acc + pChars[k] * dChars[k], 0);
  const pMagnitude = math.sqrt(Object.values(pChars).reduce((acc, v) => acc + v ** 2, 0));
  const dMagnitude = math.sqrt(Object.values(dChars).reduce((acc, v) => acc + v ** 2, 0));
  return dotProduct / (pMagnitude * dMagnitude);
}

async function handleClick(email) {
    const personality = await getPersonality(email);
    const dateOptionsArray = Object.entries(dateOptions).map(([date, option]) => ({
      date,
      ...option,
    }));
    const bestDateOptions = getBestDateOptions(personality, dateOptionsArray);
    console.log(bestDateOptions);
  }
  
  function getBestDateOptions(personality, dateOptions) {
    if (!dateOptions) {
      return [];
    }
  
    const sortedOptions = dateOptions
      .map((option) => ({
        option,
        similarity: similarity(personality, option),
      }))
      .sort((a, b) => b.similarity - a.similarity);
  
    return sortedOptions.slice(0, 3).map((option) => option.option);
  }
  
  const getPersonality = async (email) => {
    const docRef = doc(db, "profiles", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.mbtiType;
    } else {
      console.log("No such document!");
    }
  };