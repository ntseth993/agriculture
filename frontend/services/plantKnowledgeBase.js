// Comprehensive Plant Disease Knowledge Base with Real Agricultural Data
export const plantDiseaseDatabase = {
  wheat: {
    commonName: "Wheat",
    scientificName: "Triticum aestivum",
    growingConditions: {
      temperature: { min: 15, max: 25, optimal: 20 },
      humidity: { min: 40, max: 70, optimal: 55 },
      rainfall: { min: 400, max: 600, optimal: 500 }, // mm per season
      soilPH: { min: 6.0, max: 7.5, optimal: 6.5 },
      sunlight: { min: 6, max: 8, optimal: 7 } // hours per day
    },
    diseases: [
      {
        name: "Wheat Leaf Rust",
        scientificName: "Puccinia triticina",
        severity: "high",
        symptoms: [
          "Small orange-brown pustules on leaves",
          "Circular to oval uredinia on upper leaf surface",
          "Yellowing and premature death of infected tissue",
          "Reduced photosynthesis and grain yield"
        ],
        causes: [
          "Fungal pathogen Puccinia triticina",
          "High humidity (70-90%) and moderate temperatures (15-25°C)",
          "Overwintering of fungal spores on crop residue",
          "Wind-borne spores spreading to healthy plants"
        ],
        treatment: {
          chemical: [
            "Apply tebuconazole fungicide at 0.5-1.0 L/ha",
            "Use propiconazole 250 EC at 0.5 L/ha",
            "Spray mancozeb at 2-3 kg/ha as preventive measure"
          ],
          biological: [
            "Apply Bacillus subtilis-based biofungicides",
            "Use Trichoderma harzianum soil applications",
            "Introduce resistant wheat varieties"
          ],
          cultural: [
            "Crop rotation with non-host crops for 2-3 years",
            "Remove and destroy infected plant debris",
            "Ensure proper field drainage and air circulation",
            "Use certified disease-free seeds"
          ],
          timing: "Apply fungicides at first sign of infection, repeat every 7-14 days during favorable conditions"
        },
        prevention: [
          "Plant resistant varieties (e.g., 'PBW 343', 'HD 2967')",
          "Avoid excessive nitrogen fertilization",
          "Maintain optimal plant spacing (20-22.5 cm)",
          "Monitor fields regularly during critical growth stages"
        ],
        economicImpact: {
          yieldLoss: "5-30% depending on infection severity and timing",
          treatmentCost: "$15-25 per hectare per application",
          marketPrice: "Quality reduction can lower price by 10-20%"
        }
      },
      {
        name: "Powdery Mildew",
        scientificName: "Blumeria graminis f.sp. tritici",
        severity: "medium",
        symptoms: [
          "White to grayish powdery growth on leaves and stems",
          "Yellowing and curling of infected leaves",
          "Reduced photosynthetic area",
          "Stunted growth in severe infections"
        ],
        causes: [
          "Fungal pathogen Blumeria graminis",
          "High humidity (60-80%) with moderate temperatures (15-22°C)",
          "Poor air circulation in dense stands",
          "Excessive nitrogen fertilization"
        ],
        treatment: {
          chemical: [
            "Apply sulfur-based fungicides (wettable sulfur 80% WP at 2-3 kg/ha)",
            "Use propiconazole 250 EC at 0.5 L/ha",
            "Apply triadimefon 25% WP at 0.5 kg/ha"
          ],
          biological: [
            "Apply neem oil formulations (2-3%)",
            "Use Bacillus subtilis QST 713",
            "Introduce mycorrhizal fungi associations"
          ],
          cultural: [
            "Reduce plant density for better air circulation",
          "Avoid overhead irrigation",
            "Balance nitrogen fertilization",
            "Remove infected plant parts"
          ],
          timing: "Treat when 5-10% of plants show symptoms"
        },
        prevention: [
          "Choose resistant varieties",
          "Maintain proper plant spacing",
          "Apply balanced fertilizers",
          "Ensure good field ventilation"
        ],
        economicImpact: {
          yieldLoss: "10-20% in severe cases",
          treatmentCost: "$10-20 per hectare",
          marketPrice: "Minimal impact if treated early"
        }
      },
      {
        name: "Septoria Leaf Blotch",
        scientificName: "Zymoseptoria tritici",
        severity: "medium",
        symptoms: [
          "Irregular brown to black lesions on lower leaves",
          "Yellowing around lesions (chlorosis)",
          "Small black pycnidia within lesions",
          "Premature death of lower leaves"
        ],
        causes: [
          "Fungal pathogen Zymoseptoria tritici",
          "Extended leaf wetness periods (>24 hours)",
          "Moderate temperatures (15-20°C)",
          "High rainfall and humidity"
        ],
        treatment: {
          chemical: [
            "Apply chlorothalonil 75% WP at 2 kg/ha",
            "Use azoxystrobin 250 SC at 1 L/ha",
            "Apply mancozeb 75% WP at 2.5 kg/ha"
          ],
          biological: [
            "Apply copper-based fungicides (Bordeaux mixture)",
            "Use compost tea applications"
          ],
          cultural: [
            "Crop rotation with non-cereal crops",
            "Deep plowing to bury crop residue",
            "Balanced fertilization",
            "Resistant varieties"
          ],
          timing: "Apply protectant fungicides before infection periods"
        },
        prevention: [
          "Use certified disease-free seeds",
          "Implement crop rotation",
          "Avoid excessive irrigation",
          "Monitor weather conditions"
        ],
        economicImpact: {
          yieldLoss: "5-15% depending on disease pressure",
          treatmentCost: "$12-22 per hectare",
          marketPrice: "Slight reduction in test weight"
        }
      },
      {
        name: "Fusarium Head Blight",
        scientificName: "Fusarium graminearum",
        severity: "high",
        symptoms: [
          "Bleaching of spikelets in one or more spikelets",
          "Pinkish to salmon-colored mold at base of glumes",
          "Shriveled, lightweight kernels (tombstone)",
          "Accumulation of mycotoxins (DON, ZEN)"
        ],
        causes: [
          "Fungal pathogen Fusarium graminearum",
          "Warm, humid weather during flowering (20-28°C, >70% RH)",
          "Corn-wheat rotation increases risk",
          "Infected crop residue and seed"
        ],
        treatment: {
          chemical: [
            "Apply tebuconazole 250 EW at 1 L/ha at flowering",
            "Use metconazole 100 SC at 0.5 L/ha",
            "Apply prothioconazole 250 EC at 0.75 L/ha"
          ],
          biological: [
            "Apply Bacillus velezensis QST 713",
            "Use Trichoderma spp. seed treatments"
          ],
          cultural: [
            "Avoid corn-wheat rotation",
            "Plant resistant varieties",
          "Adjust planting dates to avoid infection periods",
          "Proper residue management"
          ],
          timing: "Critical application at early flowering (50% anthesis)"
        },
        prevention: [
          "Crop rotation with non-host crops",
          "Resistant varieties",
          "Fungicide seed treatments",
          "Residue management"
        ],
        economicImpact: {
          yieldLoss: "10-50% with mycotoxin contamination",
          treatmentCost: "$20-35 per hectare",
          marketPrice: "Severe price reduction due to mycotoxins"
        }
      },
      {
        name: "Healthy Plant",
        scientificName: "Triticum aestivum",
        severity: "none",
        symptoms: [
          "Deep green leaves without discoloration",
          "Uniform growth and development",
          "No visible lesions or abnormal growths",
          "Normal tillering and heading"
        ],
        causes: [
          "Optimal growing conditions",
          "Good management practices",
          "Disease-free environment"
        ],
        treatment: {
          chemical: [],
          biological: [
            "Maintain beneficial soil microorganisms",
            "Continue regular monitoring"
          ],
          cultural: [
            "Continue current management practices",
            "Maintain proper irrigation and fertilization",
            "Regular field scouting"
          ],
          timing: "No treatment needed, continue monitoring"
        },
        prevention: [
          "Maintain current good practices",
          "Regular field monitoring",
          "Balanced fertilization",
          "Proper irrigation management"
        ],
        economicImpact: {
          yieldLoss: "0%",
          treatmentCost: "$0",
          marketPrice: "Premium quality possible"
        }
      }
    ],
    nutritionalRequirements: {
      nitrogen: "120-150 kg/ha",
      phosphorus: "40-60 kg/ha", 
      potassium: "30-50 kg/ha",
      sulfur: "20-30 kg/ha",
      zinc: "5-10 kg/ha"
    },
    growthStages: [
      { name: "Germination", days: "4-7", description: "Seed sprouting and root development" },
      { name: "Tillering", days: "20-30", description: "Development of secondary shoots" },
      { name: "Stem Extension", days: "30-45", description: "Rapid stem growth" },
      { name: "Booting", days: "45-55", description: "Head development inside sheath" },
      { name: "Heading", days: "55-65", description: "Emergence of wheat head" },
      { name: "Flowering", days: "65-75", description: "Anthesis and pollination" },
      { name: "Grain Filling", days: "75-90", description: "Kernel development" },
      { name: "Maturity", days: "90-120", description: "Physiological maturity" }
    ]
  },
  
  rice: {
    commonName: "Rice",
    scientificName: "Oryza sativa",
    growingConditions: {
      temperature: { min: 20, max: 35, optimal: 28 },
      humidity: { min: 70, max: 90, optimal: 80 },
      rainfall: { min: 1000, max: 1500, optimal: 1200 },
      soilPH: { min: 5.5, max: 7.0, optimal: 6.0 },
      sunlight: { min: 6, max: 8, optimal: 7 }
    },
    diseases: [
      {
        name: "Rice Blast",
        scientificName: "Magnaporthe oryzae",
        severity: "high",
        symptoms: [
          "Diamond-shaped lesions with gray centers and brown margins",
          "Lesions on leaves, nodes, and panicles",
          "Node infection causes neck break and white heads",
          "Severe infection causes plant death"
        ],
        causes: [
          "Fungal pathogen Magnaporthe oryzae",
          "High humidity (>90%) and warm temperatures (25-28°C)",
          "Excessive nitrogen fertilization",
          "Cloudy weather and frequent drizzles"
        ],
        treatment: {
          chemical: [
            "Apply tricyclazole 75% WP at 0.6 kg/ha",
            "Use azoxystrobin 250 SC at 1 L/ha",
            "Apply isoprothiolane 40% EC at 1.5 L/ha"
          ],
          biological: [
            "Apply Pseudomonas fluorescens formulations",
            "Use Bacillus subtilis QST 713",
            "Apply Trichoderma harzianum"
          ],
          cultural: [
            "Use resistant varieties (e.g., 'IR64', 'Swarna')",
            "Balanced nitrogen fertilization",
            "Proper water management",
            "Field sanitation"
          ],
          timing: "Apply at first symptom appearance, repeat every 7-10 days"
        },
        prevention: [
          "Plant blast-resistant varieties",
          "Avoid excessive nitrogen",
          "Maintain proper field drainage",
          "Seed treatment with fungicides"
        ],
        economicImpact: {
          yieldLoss: "10-50% depending on infection timing",
          treatmentCost: "$25-40 per hectare",
          marketPrice: "Significant reduction in grain quality"
        }
      },
      {
        name: "Bacterial Leaf Blight",
        scientificName: "Xanthomonas oryzae pv. oryzae",
        severity: "medium",
        symptoms: [
          "Water-soaked lesions along leaf margins",
          "Lesions turn yellow to white as they expand",
          "Kresek phase: seedling wilting and death",
          "Leaf drying from tip downward"
        ],
        causes: [
          "Bacterial pathogen Xanthomonas oryzae",
          "High temperature (25-30°C) and high humidity (>80%)",
          "Typhoons and heavy rain spread bacteria",
          "Infected seed and plant debris"
        ],
        treatment: {
          chemical: [
            "Apply copper hydroxide 77% WP at 2.5 kg/ha",
            "Use streptomycin sulfate at 1 g/L",
            "Apply kasugamycin 3% SL at 2 L/ha"
          ],
          biological: [
            "Apply bacteriophage sprays",
            "Use beneficial Pseudomonas spp.",
            "Apply plant extracts (neem, garlic)"
          ],
          cultural: [
            "Use resistant varieties",
            "Seed treatment with hot water (52°C for 10 min)",
            "Balanced fertilization",
            "Field sanitation"
          ],
          timing: "Early application at first symptom appearance"
        },
        prevention: [
          "Use certified disease-free seeds",
          "Resistant varieties",
          "Proper field drainage",
          "Avoid excessive nitrogen"
        ],
        economicImpact: {
          yieldLoss: "5-30% depending on variety resistance",
          treatmentCost: "$15-30 per hectare",
          marketPrice: "Moderate quality reduction"
        }
      },
      {
        name: "Brown Spot",
        scientificName: "Cochliobolus miyabeanus",
        severity: "low",
        symptoms: [
          "Small, circular to oval brown spots on leaves",
          "Spots have grayish center and brown margin",
          "Numerous spots cause leaf yellowing",
          "Spots also occur on glumes and grains"
        ],
        causes: [
          "Fungal pathogen Cochliobolus miyabeanus",
          "Nutrient deficiency (especially silicon)",
          "Poor plant vigor and stress",
          "High humidity and moderate temperature"
        ],
        treatment: {
          chemical: [
            "Apply propiconazole 250 EC at 0.5 L/ha",
            "Use mancozeb 75% WP at 2 kg/ha",
            "Apply hexaconazole 5% EC at 1 L/ha"
          ],
          biological: [
            "Apply silicon fertilizers",
            "Use Trichoderma formulations",
            "Apply neem oil sprays"
          ],
          cultural: [
            "Balanced fertilization with silicon",
            "Proper water management",
            "Resistant varieties",
            "Field sanitation"
          ],
          timing: "Apply when disease first appears"
        },
        prevention: [
          "Silicon fertilization",
          "Balanced nutrition",
          "Resistant varieties",
          "Good water management"
        ],
        economicImpact: {
          yieldLoss: "5-15% in severe cases",
          treatmentCost: "$10-20 per hectare",
          marketPrice: "Minimal impact if managed"
        }
      },
      {
        name: "Sheath Blight",
        scientificName: "Rhizoctonia solani",
        severity: "medium",
        symptoms: [
          "Oblong, irregular lesions on leaf sheaths",
          "Lesions have grayish center and brown margins",
          "Lesions coalesce causing sheath death",
          "White heads and reduced grain filling"
        ],
        causes: [
          "Fungal pathogen Rhizoctonia solani",
          "High humidity (>85%) and temperature (28-32°C)",
          "Dense planting and poor air circulation",
          "Excessive nitrogen fertilization"
        ],
        treatment: {
          chemical: [
            "Apply validamycin 3% L at 2 L/ha",
            "Use azoxystrobin 250 SC at 1 L/ha",
            "Apply propiconazole 250 EC at 0.5 L/ha"
          ],
          biological: [
            "Apply Pseudomonas fluorescens",
            "Use Bacillus subtilis formulations",
            "Apply Trichoderma harzianum"
          ],
          cultural: [
            "Proper plant spacing",
            "Balanced nitrogen fertilization",
            "Good water management",
            "Resistant varieties"
          ],
          timing: "Apply at maximum tillering stage"
        },
        prevention: [
          "Proper plant spacing",
          "Balanced fertilization",
          "Resistant varieties",
          "Good field management"
        ],
        economicImpact: {
          yieldLoss: "8-25% depending on severity",
          treatmentCost: "$20-35 per hectare",
          marketPrice: "Moderate quality impact"
        }
      },
      {
        name: "Healthy Plant",
        scientificName: "Oryza sativa",
        severity: "none",
        symptoms: [
          "Dark green leaves without spots",
          "Uniform tillering and growth",
          "Healthy panicle development",
          "Normal grain filling"
        ],
        causes: [
          "Optimal growing conditions",
          "Good water management",
          "Balanced fertilization"
        ],
        treatment: {
          chemical: [],
          biological: [
            "Maintain beneficial microbes",
            "Continue monitoring"
          ],
          cultural: [
            "Continue current practices",
            "Regular field inspection"
          ],
          timing: "No treatment needed"
        },
        prevention: [
          "Maintain good practices",
          "Regular monitoring",
          "Balanced nutrition"
        ],
        economicImpact: {
          yieldLoss: "0%",
          treatmentCost: "$0",
          marketPrice: "Premium quality achievable"
        }
      }
    ],
    nutritionalRequirements: {
      nitrogen: "100-120 kg/ha",
      phosphorus: "40-60 kg/ha",
      potassium: "40-80 kg/ha",
      sulfur: "20-30 kg/ha",
      zinc: "25-50 kg/ha",
      silicon: "200-500 kg/ha"
    },
    growthStages: [
      { name: "Seedling", days: "0-25", description: "Germination and seedling establishment" },
      { name: "Tillering", days: "25-55", description: "Development of tillers" },
      { name: "Stem Elongation", days: "55-85", description: "Rapid stem growth" },
      { name: "Panicle Initiation", days: "85-105", description: "Panicle development" },
      { name: "Heading", days: "105-115", description: "Panicle emergence" },
      { name: "Flowering", days: "115-125", description: "Anthesis" },
      { name: "Grain Filling", days: "125-145", description: "Grain development" },
      { name: "Maturity", days: "145-165", description: "Harvest maturity" }
    ]
  },

  corn: {
    commonName: "Corn/Maize",
    scientificName: "Zea mays",
    growingConditions: {
      temperature: { min: 18, max: 32, optimal: 25 },
      humidity: { min: 50, max: 80, optimal: 65 },
      rainfall: { min: 500, max: 800, optimal: 600 },
      soilPH: { min: 5.8, max: 7.2, optimal: 6.5 },
      sunlight: { min: 8, max: 10, optimal: 9 }
    },
    diseases: [
      {
        name: "Northern Leaf Blight",
        scientificName: "Setosphaeria turcica",
        severity: "medium",
        symptoms: [
          "Long, elliptical gray-green lesions on leaves",
          "Lesions 1-6 inches long with parallel sides",
          "Lesions turn tan to brown as they age",
          "Severe infection causes premature leaf death"
        ],
        causes: [
          "Fungal pathogen Setosphaeria turcica",
          "Moderate temperatures (18-27°C) and high humidity",
          "Extended leaf wetness periods",
          "Overwintering in crop residue"
        ],
        treatment: {
          chemical: [
            "Apply pyraclostrobin 250 SC at 1 L/ha",
            "Use azoxystrobin 250 SC at 1 L/ha",
            "Apply mancozeb 75% WP at 2.5 kg/ha"
          ],
          biological: [
            "Apply Bacillus subtilis QST 713",
            "Use Trichoderma harzianum",
            "Apply compost tea"
          ],
          cultural: [
            "Resistant hybrids (e.g., 'DKC 61-69', 'Pioneer 33B51')",
            "Crop rotation with non-host crops",
            "Tillage to bury residue",
            "Balanced fertilization"
          ],
          timing: "Apply at tasseling stage or first symptoms"
        },
        prevention: [
          "Plant resistant hybrids",
          "Crop rotation",
          "Residue management",
          "Proper plant density"
        ],
        economicImpact: {
          yieldLoss: "10-30% depending on hybrid resistance",
          treatmentCost: "$20-35 per hectare",
          marketPrice: "Moderate quality reduction"
        }
      },
      {
        name: "Gray Leaf Spot",
        scientificName: "Cercospora zeae-maydis",
        severity: "medium",
        symptoms: [
          "Rectangular grayish-tan lesions on leaves",
          "Lesions restricted by veins, giving rectangular appearance",
          "Lesions 0.5-2 cm long, parallel to leaf veins",
          "Severe infection causes leaf blighting"
        ],
        causes: [
          "Fungal pathogen Cercospora zeae-maydis",
          "High humidity (>90%) and warm temperatures (25-30°C)",
          "No-till or reduced tillage practices",
          "Infected crop residue"
        ],
        treatment: {
          chemical: [
            "Apply azoxystrobin 250 SC at 1 L/ha",
            "Use pyraclostrobin 250 SC at 1 L/ha",
            "Apply propiconazole 250 EC at 0.5 L/ha"
          ],
          biological: [
            "Apply Bacillus-based products",
            "Use beneficial fungi",
            "Apply neem oil formulations"
          ],
          cultural: [
            "Resistant hybrids",
            "Crop rotation",
            "Residue management",
          "Proper plant density"
          ],
          timing: "Apply before disease spread, repeat every 7-14 days"
        },
        prevention: [
          "Resistant hybrids",
          "Crop rotation",
          "Residue management",
          "Balanced fertilization"
        ],
        economicImpact: {
          yieldLoss: "5-25% depending on timing and severity",
          treatmentCost: "$18-30 per hectare",
          marketPrice: "Slight to moderate quality impact"
        }
      },
      {
        name: "Common Rust",
        scientificName: "Puccinia sorghi",
        severity: "low",
        symptoms: [
          "Small circular to oval rust-colored pustules",
          "Pustules on both upper and lower leaf surfaces",
          "Powdery spores can be rubbed off",
          "Severe infection causes leaf yellowing"
        ],
        causes: [
          "Fungal pathogen Puccinia sorghi",
          "Cool to moderate temperatures (16-25°C)",
          "High humidity and leaf wetness",
          "Wind-borne spores from alternate hosts"
        ],
        treatment: {
          chemical: [
            "Apply mancozeb 75% WP at 2 kg/ha",
            "Use propiconazole 250 EC at 0.5 L/ha",
            "Apply tebuconazole 250 EW at 1 L/ha"
          ],
          biological: [
            "Apply sulfur-based fungicides",
            "Use neem oil sprays",
            "Apply Bacillus formulations"
          ],
          cultural: [
            "Resistant hybrids",
          "Early planting",
            "Proper plant density",
            "Monitor disease development"
          ],
          timing: "Apply when rust first appears"
        },
        prevention: [
          "Resistant hybrids",
          "Early planting",
          "Proper plant density",
          "Regular monitoring"
        ],
        economicImpact: {
          yieldLoss: "3-15% in severe cases",
          treatmentCost: "$12-25 per hectare",
          marketPrice: "Minimal impact if controlled"
        }
      },
      {
        name: "Ear Rot",
        scientificName: "Fusarium verticillioides",
        severity: "high",
        symptoms: [
          "Pinkish to whitish mold on kernels",
          "Discolored and shrunken kernels",
          "Musty odor from infected ears",
          "Mycotoxin contamination (fumonisin)"
        ],
        causes: [
          "Fungal pathogen Fusarium verticillioides",
          "Warm, dry conditions followed by humid weather",
          "Insect damage facilitating infection",
          "Stress conditions during grain fill"
        ],
        treatment: {
          chemical: [
            "Apply tebuconazole 250 EW at 1 L/ha at silking",
            "Use propiconazole 250 EC at 0.5 L/ha",
            "Apply metconazole 100 SC at 0.5 L/ha"
          ],
          biological: [
            "Apply Bacillus velezensis",
            "Use Trichoderma seed treatments",
            "Apply beneficial microbes"
          ],
          cultural: [
            "Resistant hybrids",
            "Insect control for ear damage prevention",
            "Proper drying and storage",
            "Crop rotation"
          ],
          timing: "Critical application at silking stage"
        },
        prevention: [
          "Resistant hybrids",
          "Insect management",
          "Proper storage conditions",
          "Crop rotation"
        ],
        economicImpact: {
          yieldLoss: "5-30% plus mycotoxin losses",
          treatmentCost: "$25-40 per hectare",
          marketPrice: "Severe reduction due to mycotoxins"
        }
      },
      {
        name: "Healthy Plant",
        scientificName: "Zea mays",
        severity: "none",
        symptoms: [
          "Dark green leaves without lesions",
          "Uniform growth and development",
          "Healthy tassel and ear development",
          "Normal kernel set and filling"
        ],
        causes: [
          "Optimal growing conditions",
          "Good management practices",
          "No disease pressure"
        ],
        treatment: {
          chemical: [],
          biological: [
            "Maintain soil health",
            "Continue monitoring"
          ],
          cultural: [
            "Continue current practices",
            "Regular field inspection"
          ],
          timing: "No treatment needed"
        },
        prevention: [
          "Maintain good practices",
          "Regular monitoring",
          "Balanced nutrition"
        ],
        economicImpact: {
          yieldLoss: "0%",
          treatmentCost: "$0",
          marketPrice: "Premium quality achievable"
        }
      }
    ],
    nutritionalRequirements: {
      nitrogen: "150-200 kg/ha",
      phosphorus: "40-60 kg/ha",
      potassium: "40-80 kg/ha",
      sulfur: "20-30 kg/ha",
      zinc: "10-20 kg/ha",
      boron: "1-2 kg/ha"
    },
    growthStages: [
      { name: "VE", days: "0-10", description: "Emergence" },
      { name: "V1-V5", days: "10-30", description: "Vegetative stages" },
      { name: "V6-V12", days: "30-55", description: "Rapid vegetative growth" },
      { name: "VT", days: "55-65", description: "Tasseling" },
      { name: "R1", days: "65-75", description: "Silking" },
      { name: "R2-R3", days: "75-85", description: "Blister and milk stage" },
      { name: "R4-R5", days: "85-95", description: "Dough and dent stage" },
      { name: "R6", days: "95-120", description: "Physiological maturity" }
    ]
  },

  tomato: {
    commonName: "Tomato",
    scientificName: "Solanum lycopersicum",
    growingConditions: {
      temperature: { min: 18, max: 30, optimal: 24 },
      humidity: { min: 60, max: 80, optimal: 70 },
      rainfall: { min: 400, max: 600, optimal: 500 },
      soilPH: { min: 6.0, max: 7.0, optimal: 6.5 },
      sunlight: { min: 6, max: 8, optimal: 7 }
    },
    diseases: [
      {
        name: "Early Blight",
        scientificName: "Alternaria solani",
        severity: "medium",
        symptoms: [
          "Dark brown to black circular spots on older leaves",
          "Concentric rings giving target-like appearance",
          "Yellowing around lesions (chlorosis)",
          "Defoliation in severe infections"
        ],
        causes: [
          "Fungal pathogen Alternaria solani",
          "Warm temperatures (20-25°C) and high humidity",
          "Poor air circulation",
          "Stressed plants"
        ],
        treatment: {
          chemical: [
            "Apply copper fungicides (copper hydroxide 77% WP at 2 kg/ha)",
            "Use chlorothalonil 75% WP at 2 kg/ha",
            "Apply mancozeb 75% WP at 2 kg/ha"
          ],
          biological: [
            "Apply Bacillus subtilis QST 713",
            "Use neem oil formulations (2-3%)",
            "Apply compost tea"
          ],
          cultural: [
            "Resistant varieties (e.g., 'Celebrity', 'Roma VF')",
            "Proper plant spacing and pruning",
            "Avoid overhead irrigation",
            "Remove infected plant debris"
          ],
          timing: "Apply at first sign of disease, repeat every 7-10 days"
        },
        prevention: [
          "Resistant varieties",
          "Proper spacing and pruning",
          "Drip irrigation",
          "Sanitation practices"
        ],
        economicImpact: {
          yieldLoss: "10-30% depending on severity",
          treatmentCost: "$15-25 per hectare",
          marketPrice: "Moderate quality reduction"
        }
      },
      {
        name: "Late Blight",
        scientificName: "Phytophthora infestans",
        severity: "high",
        symptoms: [
          "Water-soaked lesions on leaves and stems",
          "White fuzzy growth on undersides of leaves during humidity",
          "Large, irregular brown lesions that expand rapidly",
          "Fruit lesions are dark, greasy, and firm"
        ],
        causes: [
          "Oomycete pathogen Phytophthora infestans",
          "Cool temperatures (15-20°C) and high humidity (>90%)",
          "Rain and extended leaf wetness",
          "Infected seed tubers and plant debris"
        ],
        treatment: {
          chemical: [
            "Apply metalaxyl + mancozeb (8% + 64% WP) at 2 kg/ha",
            "Use copper hydroxide 77% WP at 2 kg/ha",
            "Apply chlorothalonil 75% WP at 2 kg/ha"
          ],
          biological: [
            "Apply copper-based products",
            "Use beneficial microbes",
            "Apply plant extracts"
          ],
          cultural: [
            "Resistant varieties (e.g., 'Defender', 'Mountain Magic')",
            "Proper ventilation in greenhouse",
            "Avoid overhead irrigation",
            "Destroy infected plants"
          ],
          timing: "Critical early application at first symptoms"
        },
        prevention: [
          "Resistant varieties",
          "Proper ventilation",
          "Avoid overhead watering",
          "Sanitation"
        ],
        economicImpact: {
          yieldLoss: "20-100% in favorable conditions",
          treatmentCost: "$20-35 per hectare",
          marketPrice: "Severe quality and yield loss"
        }
      },
      {
        name: "Septoria Leaf Spot",
        scientificName: "Septoria lycopersici",
        severity: "low",
        symptoms: [
          "Small circular spots with dark margins and gray centers",
          "Numerous spots on lower leaves first",
          "Yellowing and defoliation of affected leaves",
          "Spots may have tiny black fruiting bodies"
        ],
        causes: [
          "Fungal pathogen Septoria lycopersici",
          "Warm temperatures (20-25°C) and high humidity",
          "Rain splash and overhead irrigation",
          "Infected plant debris and seeds"
        ],
        treatment: {
          chemical: [
            "Apply copper hydroxide 77% WP at 2 kg/ha",
            "Use chlorothalonil 75% WP at 2 kg/ha",
            "Apply mancozeb 75% WP at 2 kg/ha"
          ],
          biological: [
            "Apply Bacillus subtilis",
            "Use neem oil sprays",
            "Apply compost tea"
          ],
          cultural: [
            "Resistant varieties",
            "Proper plant spacing",
          "Mulching to reduce splash",
          "Sanitation"
          ],
          timing: "Apply when disease first appears"
        },
        prevention: [
          "Resistant varieties",
          "Proper spacing",
          "Mulching",
          "Sanitation"
        ],
        economicImpact: {
          yieldLoss: "5-15% in severe cases",
          treatmentCost: "$12-20 per hectare",
          marketPrice: "Minimal impact if managed"
        }
      },
      {
        name: "Bacterial Spot",
        scientificName: "Xanthomonas vesicatoria",
        severity: "medium",
        symptoms: [
          "Small water-soaked spots on leaves",
          "Spots become brown to black with yellow halos",
          "Raised scabby lesions on fruit",
          "Leaf spotting and defoliation"
        ],
        causes: [
          "Bacterial pathogen Xanthomonas vesicatoria",
          "Warm temperatures (25-30°C) and high humidity",
          "Rain and overhead irrigation",
          "Infected seeds and plant debris"
        ],
        treatment: {
          chemical: [
            "Apply copper hydroxide 77% WP at 2 kg/ha",
            "Use copper-mancozeb combinations",
            "Apply streptomycin where permitted"
          ],
          biological: [
            "Apply beneficial bacteria",
            "Use bacteriophage sprays",
            "Apply plant extracts"
          ],
          cultural: [
            "Resistant varieties",
            "Disease-free seeds",
            "Avoid overhead irrigation",
            "Sanitation"
          ],
          timing: "Apply at first symptom appearance"
        },
        prevention: [
          "Disease-free seeds",
          "Resistant varieties",
          "Avoid overhead irrigation",
          "Sanitation"
        ],
        economicImpact: {
          yieldLoss: "10-25% depending on severity",
          treatmentCost: "$15-25 per hectare",
          marketPrice: "Fruit quality significantly affected"
        }
      },
      {
        name: "Healthy Plant",
        scientificName: "Solanum lycopersicum",
        severity: "none",
        symptoms: [
          "Dark green leaves without spots",
          "Healthy flowering and fruit set",
          "Normal fruit development",
          "No signs of stress or disease"
        ],
        causes: [
          "Optimal growing conditions",
          "Good management practices",
          "Disease-free environment"
        ],
        treatment: {
          chemical: [],
          biological: [
            "Maintain beneficial microbes",
            "Continue monitoring"
          ],
          cultural: [
            "Continue current practices",
            "Regular inspection"
          ],
          timing: "No treatment needed"
        },
        prevention: [
          "Maintain good practices",
          "Regular monitoring",
          "Proper nutrition"
        ],
        economicImpact: {
          yieldLoss: "0%",
          treatmentCost: "$0",
          marketPrice: "Premium quality achievable"
        }
      }
    ],
    nutritionalRequirements: {
      nitrogen: "100-150 kg/ha",
      phosphorus: "40-60 kg/ha",
      potassium: "100-150 kg/ha",
      calcium: "200-300 kg/ha",
      magnesium: "30-50 kg/ha"
    },
    growthStages: [
      { name: "Seedling", days: "0-30", description: "Germination and early growth" },
      { name: "Vegetative", days: "30-60", description: "Leaf and stem development" },
      { name: "Flowering", days: "60-80", description: "Flower development" },
      { name: "Fruit Set", days: "80-100", description: "Pollination and fruit initiation" },
      { name: "Fruit Development", days: "100-120", description: "Fruit growth and maturation" },
      { name: "Harvest", days: "120-150", description: "Mature fruits ready for harvest" }
    ]
  },

  potato: {
    commonName: "Potato",
    scientificName: "Solanum tuberosum",
    growingConditions: {
      temperature: { min: 15, max: 25, optimal: 18 },
      humidity: { min: 65, max: 85, optimal: 75 },
      rainfall: { min: 500, max: 750, optimal: 600 },
      soilPH: { min: 4.8, max: 6.5, optimal: 5.5 },
      sunlight: { min: 6, max: 8, optimal: 7 }
    },
    diseases: [
      {
        name: "Early Blight",
        scientificName: "Alternaria solani",
        severity: "medium",
        symptoms: [
          "Dark brown to black circular spots on leaves",
          "Concentric rings giving target-like appearance",
          "Lesions often appear first on older leaves",
          "Yellowing and defoliation in severe cases"
        ],
        causes: [
          "Fungal pathogen Alternaria solani",
          "Warm temperatures (20-25°C) and high humidity",
          "Stressed plants and poor nutrition",
          "Infected seed tubers"
        ],
        treatment: {
          chemical: [
            "Apply chlorothalonil 75% WP at 2 kg/ha",
            "Use mancozeb 75% WP at 2 kg/ha",
            "Apply copper hydroxide 77% WP at 2 kg/ha"
          ],
          biological: [
            "Apply Bacillus subtilis QST 713",
            "Use Trichoderma harzianum",
            "Apply compost tea"
          ],
          cultural: [
            "Resistant varieties (e.g., 'Kennebec', 'Yukon Gold')",
            "Proper hilling and vine management",
            "Balanced fertilization",
            "Certified disease-free seed"
          ],
          timing: "Apply at first sign of disease, repeat every 7-10 days"
        },
        prevention: [
          "Certified disease-free seed tubers",
          "Resistant varieties",
          "Proper hilling",
          "Balanced fertilization"
        ],
        economicImpact: {
          yieldLoss: "10-25% depending on severity",
          treatmentCost: "$15-25 per hectare",
          marketPrice: "Moderate quality reduction"
        }
      },
      {
        name: "Late Blight",
        scientificName: "Phytophthora infestans",
        severity: "high",
        symptoms: [
          "Water-soaked lesions on leaves and stems",
          "White fuzzy growth on undersides during humidity",
          "Large, irregular brown lesions that expand rapidly",
          "Tuber lesions are reddish-brown and firm"
        ],
        causes: [
          "Oomycete pathogen Phytophthora infestans",
          "Cool temperatures (15-20°C) and high humidity (>90%)",
          "Rain and extended leaf wetness",
          "Infected seed tubers"
        ],
        treatment: {
          chemical: [
            "Apply metalaxyl + mancozeb (8% + 64% WP) at 2 kg/ha",
            "Use copper hydroxide 77% WP at 2 kg/ha",
            "Apply chlorothalonil 75% WP at 2 kg/ha"
          ],
          biological: [
            "Apply copper-based products",
            "Use beneficial microbes",
            "Apply plant extracts"
          ],
          cultural: [
            "Resistant varieties (e.g., 'Defender', 'Sarpo Mira')",
            "Proper hilling and drainage",
            "Avoid overhead irrigation",
            "Destroy infected plants"
          ],
          timing: "Critical early application at first symptoms"
        },
        prevention: [
          "Resistant varieties",
          "Certified disease-free seed",
          "Proper drainage",
          "Sanitation"
        ],
        economicImpact: {
          yieldLoss: "20-100% in favorable conditions",
          treatmentCost: "$25-40 per hectare",
          marketPrice: "Severe quality and storage losses"
        }
      },
      {
        name: "Black Scurf",
        scientificName: "Rhizoctonia solani",
        severity: "low",
        symptoms: [
          "Black, crusty lesions on tuber surface",
          "Scurfy patches that can be scraped off",
          "Reduced tuber quality and marketability",
          "Stunted plant growth in severe cases"
        ],
        causes: [
          "Fungal pathogen Rhizoctonia solani",
          "Cool, wet soil conditions",
          "Infected seed tubers",
          "Poor soil drainage"
        ],
        treatment: {
          chemical: [
            "Apply flutriafol 125 SC at 0.5 L/ha",
            "Use thiabendazole 60% WP at 1 kg/ha (post-harvest)",
            "Apply azoxystrobin 250 SC at 1 L/ha"
          ],
          biological: [
            "Apply Trichoderma harzianum seed treatments",
            "Use Bacillus subtilis formulations",
            "Apply beneficial soil microbes"
          ],
          cultural: [
            "Certified disease-free seed tubers",
            "Crop rotation with non-host crops",
            "Proper soil drainage",
            "Optimal planting depth"
          ],
          timing: "Seed treatment and soil applications"
        },
        prevention: [
          "Certified disease-free seed",
          "Crop rotation",
          "Proper soil drainage",
          "Seed treatments"
        ],
        economicImpact: {
          yieldLoss: "5-15% mainly quality loss",
          treatmentCost: "$10-20 per hectare",
          marketPrice: "Significant quality reduction"
        }
      },
      {
        name: "Potato Virus Y",
        scientificName: "Potato virus Y",
        severity: "high",
        symptoms: [
          "Mosaic patterns on leaves",
          "Leaf mottling and yellowing",
          "Stunted growth and reduced yield",
          "Necrotic rings in some strains"
        ],
        causes: [
          "Potato virus Y (PVY)",
          "Aphid transmission",
          "Infected seed tubers",
          "Mechanical transmission"
        ],
        treatment: {
          chemical: [
            "Apply mineral oils to reduce aphid transmission",
            "Use insecticides for aphid control",
            "Apply systemic acquired resistance inducers"
          ],
          biological: [
            "Use virus-free seed tubers",
            "Apply beneficial microbes",
            "Remove infected plants"
          ],
          cultural: [
            "Certified virus-free seed tubers",
            "Resistant varieties",
            "Aphid control",
            "Rogue infected plants"
          ],
          timing: "Preventive measures before infection"
        },
        prevention: [
          "Certified virus-free seed",
          "Resistant varieties",
          "Aphid management",
          "Sanitation"
        ],
        economicImpact: {
          yieldLoss: "10-50% depending on strain",
          treatmentCost: "$20-35 per hectare",
          marketPrice: "Significant quality and yield loss"
        }
      },
      {
        name: "Healthy Plant",
        scientificName: "Solanum tuberosum",
        severity: "none",
        symptoms: [
          "Dark green healthy leaves",
          "Normal vine growth and development",
          "Healthy tuber formation",
          "No signs of stress or disease"
        ],
        causes: [
          "Optimal growing conditions",
          "Disease-free seed tubers",
          "Good management practices"
        ],
        treatment: {
          chemical: [],
          biological: [
            "Maintain soil health",
            "Continue monitoring"
          ],
          cultural: [
            "Continue current practices",
            "Regular field inspection"
          ],
          timing: "No treatment needed"
        },
        prevention: [
          "Maintain good practices",
          "Use certified seed",
          "Regular monitoring"
        ],
        economicImpact: {
          yieldLoss: "0%",
          treatmentCost: "$0",
          marketPrice: "Premium quality achievable"
        }
      }
    ],
    nutritionalRequirements: {
      nitrogen: "150-200 kg/ha",
      phosphorus: "40-80 kg/ha",
      potassium: "150-250 kg/ha",
      sulfur: "20-30 kg/ha",
      magnesium: "20-40 kg/ha"
    },
    growthStages: [
      { name: "Sprouting", days: "0-15", description: "Seed tuber sprouting" },
      { name: "Emergence", days: "15-25", description: "Shoot emergence" },
      { name: "Vegetative", days: "25-55", description: "Leaf and stem development" },
      { name: "Tuber Initiation", days: "55-75", description: "Beginning of tuber formation" },
      { name: "Tuber Bulking", days: "75-105", description: "Rapid tuber growth" },
      { name: "Maturation", days: "105-120", description: "Skin set and vine senescence" }
    ]
  }
};

// Environmental condition analysis
export const analyzeEnvironmentalConditions = (cropData, environmentalData) => {
  const conditions = cropData.growingConditions;
  const analysis = {
    optimal: true,
    riskFactors: [],
    recommendations: []
  };

  // Temperature analysis
  if (environmentalData.temperature < conditions.temperature.min) {
    analysis.optimal = false;
    analysis.riskFactors.push({
      factor: "Low Temperature",
      impact: "Reduced growth rate and disease susceptibility",
      recommendation: "Consider cold protection or delayed planting"
    });
  } else if (environmentalData.temperature > conditions.temperature.max) {
    analysis.optimal = false;
    analysis.riskFactors.push({
      factor: "High Temperature", 
      impact: "Heat stress and increased disease pressure",
      recommendation: "Increase irrigation and provide shade if possible"
    });
  }

  // Humidity analysis
  if (environmentalData.humidity < conditions.humidity.min) {
    analysis.riskFactors.push({
      factor: "Low Humidity",
      impact: "Increased water stress",
      recommendation: "Increase irrigation frequency"
    });
  } else if (environmentalData.humidity > conditions.humidity.max) {
    analysis.optimal = false;
    analysis.riskFactors.push({
      factor: "High Humidity",
      impact: "High risk of fungal diseases",
      recommendation: "Improve air circulation and monitor for disease"
    });
  }

  return analysis;
};

// Treatment recommendation engine
export const generateTreatmentPlan = (disease, severity, environmentalConditions) => {
  const plan = {
    immediate: [],
    shortTerm: [],
    longTerm: [],
    monitoring: [],
    cost: { low: 0, medium: 0, high: 0 }
  };

  // Immediate actions (within 24 hours)
  if (severity === 'high') {
    plan.immediate.push(...disease.treatment.chemical.slice(0, 2));
    plan.cost.high += 25;
  }

  // Short term actions (1-2 weeks)
  plan.shortTerm.push(...disease.treatment.chemical.slice(2));
  plan.shortTerm.push(...disease.treatment.biological);
  plan.cost.medium += 15;

  // Long term prevention
  plan.longTerm.push(...disease.treatment.cultural);
  plan.cost.low += 10;

  // Monitoring requirements
  plan.monitoring = [
    "Daily visual inspection for 7 days",
    "Weekly comprehensive scouting",
    "Environmental condition monitoring",
    "Record disease progression"
  ];

  return plan;
};
