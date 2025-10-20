import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    heroTitle: "Apna Khaana, Apna Compost",
    heroSubtitle: "Ghar se Kachra, Mitti ke Liye Fayda",
    heroDescription: "Give wet waste, get organic compost, and earn money or compost. Simple, safe, and for every home.",
    bookPickup: "Book Pickup",
    buyCompost: "Buy Compost",
    
    // Navigation
    howItWorks: "How It Works",
    whatWeAccept: "What We Accept",
    vermicompost: "Vermicompost",
    adminSetup: "Admin Setup",
    sellWaste: "Sell Waste",
    videoTutorial: "Video Tutorial",
    ourMission: "Our Mission",
    login: "Login",
    account: "Account",
    myAccount: "My Account",
    adminDashboard: "Admin Dashboard",
    adminLogin: "Admin Login",
    logout: "Logout",
    
    // What We Accept
    acceptTitle: "What We Accept",
    wetKitchenWaste: "Wet Kitchen Waste",
    wetWasteDesc: "Vegetable & fruit peels, leftovers, tea/coffee grounds, eggshells",
    dryOrganicWaste: "Dry Organic Waste",
    dryWasteDesc: "Dry leaves, cardboard, paper",
    notAllowed: "Not Allowed",
    notAllowedDesc: "Plastic, metal, glass, diapers, meat & bones, oily waste",
    keepSeparate: "Keep separate in a bucket or bag",
    mixSmallQuantities: "Can mix with wet waste in small quantities",
    doNotMix: "Do not mix these with wet waste",
    
    // How It Works
    step1Title: "Separate Your Wet Waste",
    step1Desc: "Keep kitchen waste in a separate bin or bucket",
    step2Title: "Book Pickup",
    step2Desc: "Book pickup online with your address and time slot",
    step3Title: "We Collect & Weigh",
    step3Desc: "Collector weighs the waste, checks if it's clean, and credits your account",
    step4Title: "Get Paid or Compost",
    step4Desc: "Receive cash or compost for your contribution",
    
    // Vermicompost Section
    vermicompostTitle: "Buy Our Natural Vermicompost",
    vermicompostSubtitle: "Turn Nature's Waste into Life for Your Plants",
    vermicompostDesc: "Made from locally collected kitchen waste, processed naturally, nutrient-rich, and eco-friendly — now available at minimum cost for your garden.",
    
    benefit1Title: "100% Natural & Chemical-Free",
    benefit1Desc: "Made using organic kitchen and garden waste. No chemical fertilizers, no artificial additives.",
    benefit2Title: "Boosts Plant Health & Soil",
    benefit2Desc: "Improves soil structure, aeration, and water retention. Enriches soil with essential nutrients.",
    benefit3Title: "Eco-Friendly & Sustainable",
    benefit3Desc: "Reduces waste going to landfills. Minimizes greenhouse gas emissions. Encourages circular economy.",
    benefit4Title: "Cost-Effective for Everyone",
    benefit4Desc: "Sold at minimal cost to make organic gardening accessible to all.",
    
    impactTitle: "Environmental Impact",
    impactStat1: "Every 1 kg compost = 2 kg waste diverted from landfill",
    impactStat2: "Reduces methane emissions",
    impactStat3: "Promotes soil health naturally",
    
    // Pricing
    pricePerKg: "Price per Kg",
    orderNow: "Order Now",
    contactUs: "Contact Us",
    
    // Admin
    adminTitle: "MongoDB Connection Setup",
    adminDesc: "Configure your MongoDB database connection for the waste collection system",
    connectionString: "Connection String",
    databaseName: "Database Name",
    testConnection: "Test Connection",
    saveConfiguration: "Save Configuration",
    
    // Wet Waste Selling
    sellWasteTitle: "Sell Your Wet Waste",
    sellWasteSubtitle: "Turn Your Organic Waste Into Cash",
    sellWasteDesc: "Join our waste-to-wealth program and earn money while contributing to a cleaner environment. We buy your organic kitchen waste and convert it into valuable compost.",
    earnMoney: "Earn Money",
    earnMoneyDesc: "Get paid for your organic waste contribution",
    environmentalImpact: "Environmental Impact",
    environmentalImpactDesc: "Help reduce landfill waste and pollution",
    freePickup: "Free Pickup",
    freePickupDesc: "We collect waste from your doorstep",
    quickProcess: "Quick Process",
    quickProcessDesc: "Simple booking and instant pickup scheduling",
    pricingTitle: "Pricing Per Kilogram",
    startSelling: "Start Selling",
    joinFamilies: "Join 1000+ families already earning from waste!",
    startJourney: "Start your waste-to-wealth journey today",
    
    // Video Section
    videoTitle: "Watch & Learn",
    videoSubtitle: "How EcoCompost Works",
    videoDesc: "Watch our tutorial videos in your preferred language to understand how to use our platform effectively. Learn everything you need to know in just a few minutes!",
    chooseLanguage: "Choose Your Language",
    englishTutorial: "English Tutorial",
    hindiTutorial: "हिन्दी ट्यूटोरियल",
    marathiTutorial: "मराठी ट्यूटोरियल",
    whatYoullLearn: "What You'll Learn",
    multiLanguageSupport: "Multi-Language Support",
    multiLanguageSupportDesc: "Available in English, Hindi, and Marathi",
    easyToUnderstand: "Easy to Understand",
    easyToUnderstandDesc: "Step-by-step visual guidance",
    quickLearning: "Quick Learning",
    quickLearningDesc: "Learn everything in under 5 minutes",
    readyToGetStarted: "Ready to Get Started?",
    afterWatching: "After watching the tutorial, you'll know exactly how to use our platform to manage waste, purchase compost, and contribute to a greener environment.",
    joinOurCommunity: "Join Our Community",
    learnMore: "Learn More",
    
    // Mission & Vision
    missionVisionTitle: "Our Mission & Vision",
    missionVisionSubtitle: "Building a Sustainable Future Together",
    missionVisionDesc: "Discover the driving force behind EcoCompost and understand how we're working together to create a cleaner, greener, and more sustainable world for future generations.",
    environmentalProtection: "Environmental Protection",
    environmentalProtectionDesc: "Protecting our planet through sustainable waste management practices",
    communityBuilding: "Community Building",
    communityBuildingDesc: "Building a community of eco-conscious individuals and families",
    economicEmpowerment: "Economic Empowerment",
    economicEmpowermentDesc: "Creating economic opportunities through waste-to-wealth programs",
    globalImpact: "Global Impact",
    globalImpactDesc: "Contributing to global sustainability goals and climate action",
    visionGoals: "Our Vision Goals",
    zeroWasteCities: "Zero Waste Cities",
    zeroWasteCitiesDesc: "Transform cities into zero-waste communities by 2030",
    carbonNeutral: "Carbon Neutral",
    carbonNeutralDesc: "Achieve carbon neutrality in all our operations",
    millionFamilies: "1 Million Families",
    millionFamiliesDesc: "Engage 1 million families in sustainable practices",
    greenEconomy: "Green Economy",
    greenEconomyDesc: "Create a thriving circular economy ecosystem",
    ourImpactSoFar: "Our Impact So Far",
    familiesConnected: "Families Connected",
    wasteProcessed: "Waste Processed",
    co2TonsSaved: "CO2 Tons Saved",
    activeOperations: "Active Operations",
    readyToBePart: "Ready to be part of the change?",
    joinOurMission: "Join our mission to create a sustainable future",
    
    // Leaderboard
    leaderboardTitle: "Community Leaderboard",
    leaderboardSubtitle: "Top Waste Contributors",
    leaderboardDesc: "Join our community of eco-warriors and see how you can make a difference. Every contribution counts towards a cleaner, greener future!",
    totalContributors: "Total Contributors",
    co2Saved: "CO2 Saved",
    topContributorsThisMonth: "Top Contributors This Month",
    earnPoints: "Earn points for each kg",
    monthlyRewards: "Monthly rewards",
    communityRecognition: "Community recognition",
    joinTheLeaderboard: "Join the Leaderboard!",
    startContributing: "Start contributing to our waste management program and climb the leaderboard.",
    
    // Partners Section
    partnerTitle: "Partner With Us",
    partnerSubtitle: "Government Officers & Retailers",
    partnerDesc: "Join our mission to create a sustainable future. Whether you're a government official or a retailer, we have partnership opportunities that can help you make a real impact.",
    governmentOfficers: "Government Officers",
    governmentOfficersDesc: "Join hands with us to create sustainable waste management policies and programs.",
    retailersBusinesses: "Retailers & Businesses",
    retailersBusinessesDesc: "Partner with us to offer eco-friendly products and services to your customers.",
    partnershipBenefits: "Partnership Benefits",
    policyDevelopmentSupport: "Policy Development Support",
    dataAnalyticsReports: "Data & Analytics Reports",
    communityEngagementPrograms: "Community Engagement Programs",
    environmentalImpactTracking: "Environmental Impact Tracking",
    whiteLabelProducts: "White-label Products",
    bulkSupplyAgreements: "Bulk Supply Agreements",
    marketingSupport: "Marketing Support",
    revenueSharingModel: "Revenue Sharing Model",
    getInTouch: "Get In Touch",
    contactUsForPartnership: "Contact Us for Partnership",
    successStories: "Success Stories",
    achievement: "Achievement:",
    impact: "Impact:",
    readyToMakeDifference: "Ready to Make a Difference?",
    joinOurGrowingNetwork: "Join our growing network of partners and help us create a more sustainable future. Together, we can make a real impact on waste management and environmental conservation.",
    startPartnership: "Start Partnership",
    callUsNow: "Call Us Now",
    
    // Join Initiative
    joinOurInitiative: "Join Our Initiative",
    joinInitiativeDesc: "Youth can drive a cleaner, greener future. By diverting organic waste from landfills, we reduce methane emissions, create nutrient-rich compost, and build resilient urban ecosystems.",
    getInvolved: "Get Involved",
    getInvolvedDesc: "Join our community of eco-warriors and make a real difference in your city.",
    followUs: "Follow Us",
    followUsDesc: "Stay updated with our latest initiatives and success stories.",
    contactUsDesc: "Have questions? We're here to help you get started.",
  },
  hi: {
    // Header
    heroTitle: "अपना खाना, अपना कंपोस्ट",
    heroSubtitle: "घर से कचरा, मिट्टी के लिए फायदा",
    heroDescription: "गीला कचरा दें, जैविक खाद बनवाएं, और पैसे या खाद पाएं। सरल, सुरक्षित और हर घर के लिए।",
    bookPickup: "पिकअप बुक करें",
    buyCompost: "खाद खरीदें",
    
    // Navigation
    howItWorks: "कैसे काम करता है",
    whatWeAccept: "हम क्या स्वीकार करते हैं",
    vermicompost: "वर्मीकंपोस्ट",
    adminSetup: "एडमिन सेटअप",
    sellWaste: "कचरा बेचें",
    videoTutorial: "वीडियो ट्यूटोरियल",
    ourMission: "हमारा मिशन",
    login: "लॉगिन",
    account: "खाता",
    myAccount: "मेरा खाता",
    adminDashboard: "एडमिन डैशबोर्ड",
    adminLogin: "एडमिन लॉगिन",
    logout: "लॉगआउट",
    
    // What We Accept
    acceptTitle: "हम क्या स्वीकार करते हैं",
    wetKitchenWaste: "गीला रसोई का कचरा",
    wetWasteDesc: "सब्जी और फलों के छिलके, बचा हुआ खाना, चाय/कॉफी के अवशेष, अंडे के छिलके",
    dryOrganicWaste: "सूखा जैविक कचरा",
    dryWasteDesc: "सूखी पत्तियाँ, गत्ता, कागज",
    notAllowed: "अनुमति नहीं है",
    notAllowedDesc: "प्लास्टिक, धातु, कांच, डायपर, मांस और हड्डियाँ, तैलीय कचरा",
    keepSeparate: "बाल्टी या थैले में अलग रखें",
    mixSmallQuantities: "थोड़ी मात्रा में गीले कचरे के साथ मिला सकते हैं",
    doNotMix: "इन्हें गीले कचरे के साथ न मिलाएं",
    
    // How It Works
    step1Title: "अपना गीला कचरा अलग रखें",
    step1Desc: "रसोई का कचरा अलग बिन या बाल्टी में रखें",
    step2Title: "पिकअप बुक करें",
    step2Desc: "अपने पते और समय के साथ ऑनलाइन पिकअप बुक करें",
    step3Title: "हम इकट्ठा करें और तौलें",
    step3Desc: "कलेक्टर कचरे को तौलता है, जांचता है और आपके खाते में जमा करता है",
    step4Title: "पैसे या खाद पाएं",
    step4Desc: "अपने योगदान के लिए नकद या खाद प्राप्त करें",
    
    // Vermicompost Section
    vermicompostTitle: "हमारा प्राकृतिक वर्मीकंपोस्ट खरीदें",
    vermicompostSubtitle: "प्रकृति के कचरे को अपने पौधों के लिए जीवन में बदलें",
    vermicompostDesc: "स्थानीय रूप से एकत्र रसोई के कचरे से बनाया गया, प्राकृतिक रूप से प्रसंस्कृत, पोषक तत्वों से भरपूर और पर्यावरण के अनुकूल - अब आपके बगीचे के लिए न्यूनतम लागत पर उपलब्ध।",
    
    benefit1Title: "100% प्राकृतिक और रसायन मुक्त",
    benefit1Desc: "जैविक रसोई और बगीचे के कचरे का उपयोग करके बनाया गया। कोई रासायनिक उर्वरक नहीं, कोई कृत्रिम योजक नहीं।",
    benefit2Title: "पौधों के स्वास्थ्य और मिट्टी को बढ़ावा",
    benefit2Desc: "मिट्टी की संरचना, वातन और जल प्रतिधारण में सुधार। आवश्यक पोषक तत्वों से मिट्टी को समृद्ध करता है।",
    benefit3Title: "पर्यावरण के अनुकूल और टिकाऊ",
    benefit3Desc: "लैंडफिल में जाने वाले कचरे को कम करता है। ग्रीनहाउस गैस उत्सर्जन को कम करता है। चक्रीय अर्थव्यवस्था को प्रोत्साहित करता है।",
    benefit4Title: "सभी के लिए लागत प्रभावी",
    benefit4Desc: "सभी के लिए जैविक बागवानी को सुलभ बनाने के लिए न्यूनतम लागत पर बेचा जाता है।",
    
    impactTitle: "पर्यावरणीय प्रभाव",
    impactStat1: "हर 1 किलो खाद = लैंडफिल से 2 किलो कचरा बचाया",
    impactStat2: "मीथेन उत्सर्जन को कम करता है",
    impactStat3: "प्राकृतिक रूप से मिट्टी के स्वास्थ्य को बढ़ावा देता है",
    
    // Pricing
    pricePerKg: "प्रति किलो कीमत",
    orderNow: "अभी ऑर्डर करें",
    contactUs: "संपर्क करें",
    
    // Admin
    adminTitle: "MongoDB कनेक्शन सेटअप",
    adminDesc: "कचरा संग्रह प्रणाली के लिए अपने MongoDB डेटाबेस कनेक्शन को कॉन्फ़िगर करें",
    connectionString: "कनेक्शन स्ट्रिंग",
    databaseName: "डेटाबेस का नाम",
    testConnection: "कनेक्शन परीक्षण करें",
    saveConfiguration: "कॉन्फ़िगरेशन सहेजें",
    
    // Wet Waste Selling
    sellWasteTitle: "अपना गीला कचरा बेचें",
    sellWasteSubtitle: "अपने जैविक कचरे को नकदी में बदलें",
    sellWasteDesc: "हमारे कचरा-से-धन कार्यक्रम में शामिल हों और स्वच्छ पर्यावरण में योगदान देते हुए पैसा कमाएं। हम आपके जैविक रसोई के कचरे को खरीदते हैं और इसे मूल्यवान खाद में बदलते हैं।",
    earnMoney: "पैसा कमाएं",
    earnMoneyDesc: "अपने जैविक कचरे के योगदान के लिए भुगतान प्राप्त करें",
    environmentalImpact: "पर्यावरणीय प्रभाव",
    environmentalImpactDesc: "लैंडफिल कचरे और प्रदूषण को कम करने में मदद करें",
    freePickup: "मुफ्त पिकअप",
    freePickupDesc: "हम आपके दरवाजे से कचरा इकट्ठा करते हैं",
    quickProcess: "तेज़ प्रक्रिया",
    quickProcessDesc: "सरल बुकिंग और तत्काल पिकअप शेड्यूलिंग",
    pricingTitle: "प्रति किलोग्राम मूल्य",
    startSelling: "बेचना शुरू करें",
    joinFamilies: "1000+ परिवारों में शामिल हों जो पहले से ही कचरे से कमाई कर रहे हैं!",
    startJourney: "आज ही अपनी कचरा-से-धन यात्रा शुरू करें",
    
    // Video Section
    videoTitle: "देखें और सीखें",
    videoSubtitle: "EcoCompost कैसे काम करता है",
    videoDesc: "हमारे प्लेटफॉर्म का प्रभावी उपयोग कैसे करें, इसे समझने के लिए अपनी पसंदीदा भाषा में हमारे ट्यूटोरियल वीडियो देखें। कुछ ही मिनटों में सब कुछ जानें!",
    chooseLanguage: "अपनी भाषा चुनें",
    englishTutorial: "अंग्रेजी ट्यूटोरियल",
    hindiTutorial: "हिन्दी ट्यूटोरियल",
    marathiTutorial: "मराठी ट्यूटोरियल",
    whatYoullLearn: "आप क्या सीखेंगे",
    multiLanguageSupport: "बहु-भाषा समर्थन",
    multiLanguageSupportDesc: "अंग्रेजी, हिंदी और मराठी में उपलब्ध",
    easyToUnderstand: "समझने में आसान",
    easyToUnderstandDesc: "चरण-दर-चरण दृश्य मार्गदर्शन",
    quickLearning: "तेज़ सीखना",
    quickLearningDesc: "5 मिनट में सब कुछ सीखें",
    readyToGetStarted: "शुरू करने के लिए तैयार हैं?",
    afterWatching: "ट्यूटोरियल देखने के बाद, आपको बिल्कुल पता होगा कि कचरे का प्रबंधन, खाद खरीदने और हरे पर्यावरण में योगदान देने के लिए हमारे प्लेटफॉर्म का उपयोग कैसे करें।",
    joinOurCommunity: "हमारे समुदाय में शामिल हों",
    learnMore: "और जानें",
    
    // Mission & Vision
    missionVisionTitle: "हमारा मिशन और विजन",
    missionVisionSubtitle: "साथ मिलकर स्थायी भविष्य का निर्माण",
    missionVisionDesc: "EcoCompost के पीछे की प्रेरणा को खोजें और समझें कि हम भविष्य की पीढ़ियों के लिए स्वच्छ, हरित और अधिक स्थायी दुनिया बनाने के लिए कैसे मिलकर काम कर रहे हैं।",
    ourMission: "हमारा मिशन",
    environmentalProtection: "पर्यावरण संरक्षण",
    environmentalProtectionDesc: "स्थायी कचरा प्रबंधन प्रथाओं के माध्यम से हमारे ग्रह की रक्षा करना",
    communityBuilding: "समुदाय निर्माण",
    communityBuildingDesc: "पर्यावरण-जागरूक व्यक्तियों और परिवारों का समुदाय बनाना",
    economicEmpowerment: "आर्थिक सशक्तिकरण",
    economicEmpowermentDesc: "कचरा-से-धन कार्यक्रमों के माध्यम से आर्थिक अवसर पैदा करना",
    globalImpact: "वैश्विक प्रभाव",
    globalImpactDesc: "वैश्विक स्थिरता लक्ष्यों और जलवायु कार्य में योगदान देना",
    visionGoals: "हमारे विजन लक्ष्य",
    zeroWasteCities: "शून्य कचरा शहर",
    zeroWasteCitiesDesc: "2030 तक शहरों को शून्य-कचरा समुदायों में बदलना",
    carbonNeutral: "कार्बन तटस्थ",
    carbonNeutralDesc: "अपने सभी संचालन में कार्बन तटस्थता प्राप्त करना",
    millionFamilies: "10 लाख परिवार",
    millionFamiliesDesc: "10 लाख परिवारों को स्थायी प्रथाओं में शामिल करना",
    greenEconomy: "हरित अर्थव्यवस्था",
    greenEconomyDesc: "एक समृद्ध चक्रीय अर्थव्यवस्था पारिस्थितिकी तंत्र बनाना",
    ourImpactSoFar: "अब तक हमारा प्रभाव",
    familiesConnected: "जुड़े परिवार",
    wasteProcessed: "प्रसंस्कृत कचरा",
    co2TonsSaved: "बचाए गए CO2 टन",
    activeOperations: "सक्रिय संचालन",
    readyToBePart: "बदलाव का हिस्सा बनने के लिए तैयार हैं?",
    joinOurMission: "स्थायी भविष्य बनाने के लिए हमारे मिशन में शामिल हों",
    
    // Leaderboard
    leaderboardTitle: "समुदाय लीडरबोर्ड",
    leaderboardSubtitle: "शीर्ष कचरा योगदानकर्ता",
    leaderboardDesc: "हमारे इको-योद्धाओं के समुदाय में शामिल हों और देखें कि आप कैसे बदलाव ला सकते हैं। हर योगदान स्वच्छ, हरित भविष्य की दिशा में गिना जाता है!",
    totalContributors: "कुल योगदानकर्ता",
    wasteProcessed: "प्रसंस्कृत कचरा",
    co2Saved: "बचाया गया CO2",
    topContributorsThisMonth: "इस महीने के शीर्ष योगदानकर्ता",
    earnPoints: "प्रत्येक किलो के लिए अंक अर्जित करें",
    monthlyRewards: "मासिक पुरस्कार",
    communityRecognition: "समुदाय मान्यता",
    joinTheLeaderboard: "लीडरबोर्ड में शामिल हों!",
    startContributing: "हमारे कचरा प्रबंधन कार्यक्रम में योगदान देना शुरू करें और लीडरबोर्ड पर चढ़ें।",
    
    // Partners Section
    partnerTitle: "हमारे साथ साझेदारी करें",
    partnerSubtitle: "सरकारी अधिकारी और खुदरा विक्रेता",
    partnerDesc: "स्थायी भविष्य बनाने के लिए हमारे मिशन में शामिल हों। चाहे आप सरकारी अधिकारी हों या खुदरा विक्रेता, हमारे पास साझेदारी के अवसर हैं जो आपको वास्तविक प्रभाव डालने में मदद कर सकते हैं।",
    governmentOfficers: "सरकारी अधिकारी",
    governmentOfficersDesc: "स्थायी कचरा प्रबंधन नीतियों और कार्यक्रमों को बनाने के लिए हमारे साथ हाथ मिलाएं।",
    retailersBusinesses: "खुदरा विक्रेता और व्यवसाय",
    retailersBusinessesDesc: "अपने ग्राहकों को पर्यावरण-अनुकूल उत्पाद और सेवाएं प्रदान करने के लिए हमारे साथ साझेदारी करें।",
    partnershipBenefits: "साझेदारी लाभ",
    policyDevelopmentSupport: "नीति विकास समर्थन",
    dataAnalyticsReports: "डेटा और एनालिटिक्स रिपोर्ट",
    communityEngagementPrograms: "समुदाय जुड़ाव कार्यक्रम",
    environmentalImpactTracking: "पर्यावरणीय प्रभाव ट्रैकिंग",
    whiteLabelProducts: "व्हाइट-लेबल उत्पाद",
    bulkSupplyAgreements: "थोक आपूर्ति समझौते",
    marketingSupport: "मार्केटिंग समर्थन",
    revenueSharingModel: "राजस्व साझाकरण मॉडल",
    getInTouch: "संपर्क में रहें",
    contactUsForPartnership: "साझेदारी के लिए हमसे संपर्क करें",
    successStories: "सफलता की कहानियां",
    achievement: "उपलब्धि:",
    impact: "प्रभाव:",
    readyToMakeDifference: "बदलाव लाने के लिए तैयार हैं?",
    joinOurGrowingNetwork: "स्थायी भविष्य बनाने में मदद करने के लिए हमारे बढ़ते नेटवर्क में शामिल हों। साथ मिलकर, हम कचरा प्रबंधन और पर्यावरण संरक्षण पर वास्तविक प्रभाव डाल सकते हैं।",
    startPartnership: "साझेदारी शुरू करें",
    callUsNow: "अभी कॉल करें",
    
    // Join Initiative
    joinOurInitiative: "हमारी पहल में शामिल हों",
    joinInitiativeDesc: "युवा एक स्वच्छ, हरित भविष्य को आगे बढ़ा सकते हैं। लैंडफिल से जैविक कचरे को हटाकर, हम मीथेन उत्सर्जन को कम करते हैं, पोषक तत्वों से भरपूर खाद बनाते हैं, और लचीले शहरी पारिस्थितिकी तंत्र का निर्माण करते हैं।",
    getInvolved: "शामिल हों",
    getInvolvedDesc: "हमारे इको-योद्धाओं के समुदाय में शामिल हों और अपने शहर में वास्तविक बदलाव लाएं।",
    followUs: "हमें फॉलो करें",
    followUsDesc: "हमारी नवीनतम पहलों और सफलता की कहानियों के साथ अपडेट रहें।",
    contactUs: "संपर्क करें",
    contactUsDesc: "प्रश्न हैं? हम आपको शुरुआत करने में मदद करने के लिए यहां हैं।",
  },
  mr: {
    // Header
    heroTitle: "आपले जेवण, आपले खत",
    heroSubtitle: "घरातून कचरा, मातीसाठी फायदा",
    heroDescription: "ओला कचरा द्या, सेंद्रिय खत बनवा आणि पैसे किंवा खत मिळवा. सोपे, सुरक्षित आणि प्रत्येक घरासाठी.",
    bookPickup: "पिकअप बुक करा",
    buyCompost: "खत खरेदी करा",
    
    // Navigation
    howItWorks: "हे कसे कार्य करते",
    whatWeAccept: "आम्ही काय स्वीकारतो",
    vermicompost: "व्हर्मीकंपोस्ट",
    adminSetup: "प्रशासक सेटअप",
    sellWaste: "कचरा विका",
    videoTutorial: "व्हिडिओ ट्यूटोरियल",
    ourMission: "आमचे मिशन",
    login: "लॉगिन",
    account: "खाते",
    myAccount: "माझे खाते",
    adminDashboard: "प्रशासक डॅशबोर्ड",
    adminLogin: "प्रशासक लॉगिन",
    logout: "लॉगआउट",
    
    // What We Accept
    acceptTitle: "आम्ही काय स्वीकारतो",
    wetKitchenWaste: "ओला स्वयंपाकघरातील कचरा",
    wetWasteDesc: "भाज्या आणि फळांचे साल, उरलेले अन्न, चहा/कॉफीचे अवशेष, अंड्यांचे कवच",
    dryOrganicWaste: "कोरडा सेंद्रिय कचरा",
    dryWasteDesc: "कोरडी पाने, पुठ्ठा, कागद",
    notAllowed: "परवानगी नाही",
    notAllowedDesc: "प्लास्टिक, धातू, काच, डायपर, मांस आणि हाडे, तेलकट कचरा",
    keepSeparate: "बादली किंवा पिशवीत वेगळे ठेवा",
    mixSmallQuantities: "थोड्या प्रमाणात ओल्या कचऱ्यात मिसळता येईल",
    doNotMix: "हे ओल्या कचऱ्यात मिसळू नका",
    
    // How It Works
    step1Title: "तुमचा ओला कचरा वेगळा ठेवा",
    step1Desc: "स्वयंपाकघरातील कचरा वेगळ्या डब्यात किंवा बादलीत ठेवा",
    step2Title: "पिकअप बुक करा",
    step2Desc: "तुमच्या पत्त्यावर आणि वेळेसह ऑनलाइन पिकअप बुक करा",
    step3Title: "आम्ही गोळा करतो आणि वजन करतो",
    step3Desc: "संकलक कचरा तोलतो, तपासतो आणि तुमच्या खात्यात जमा करतो",
    step4Title: "पैसे किंवा खत मिळवा",
    step4Desc: "तुमच्या योगदानासाठी रोख किंवा खत मिळवा",
    
    // Vermicompost Section
    vermicompostTitle: "आमचे नैसर्गिक व्हर्मीकंपोस्ट खरेदी करा",
    vermicompostSubtitle: "निसर्गाचा कचरा तुमच्या झाडांसाठी जीवनात रूपांतरित करा",
    vermicompostDesc: "स्थानिक पातळीवर गोळा केलेल्या स्वयंपाकघरातील कचऱ्यापासून तयार केलेले, नैसर्गिकरित्या प्रक्रिया केलेले, पोषक तत्वांनी समृद्ध आणि पर्यावरण अनुकूल - आता तुमच्या बागेसाठी किमान खर्चात उपलब्ध.",
    
    benefit1Title: "100% नैसर्गिक आणि रसायन मुक्त",
    benefit1Desc: "सेंद्रिय स्वयंपाकघर आणि बागेच्या कचऱ्याचा वापर करून तयार केलेले. कोणतेही रासायनिक खत नाही, कृत्रिम मिश्रण नाही.",
    benefit2Title: "झाडांचे आरोग्य आणि माती वाढवते",
    benefit2Desc: "मातीची रचना, हवेची देवाणघेवाण आणि पाणी टिकवून ठेवणे सुधारते. आवश्यक पोषक तत्वांनी माती समृद्ध करते.",
    benefit3Title: "पर्यावरण अनुकूल आणि टिकाऊ",
    benefit3Desc: "लँडफिलमध्ये जाणारा कचरा कमी करते. हरितगृह वायू उत्सर्जन कमी करते. चक्रीय अर्थव्यवस्थेला प्रोत्साहन देते.",
    benefit4Title: "सर्वांसाठी किफायतशीर",
    benefit4Desc: "सर्वांसाठी सेंद्रिय बागकाम सुलभ करण्यासाठी किमान खर्चात विकले जाते.",
    
    impactTitle: "पर्यावरणीय प्रभाव",
    impactStat1: "प्रत्येक 1 किलो खत = लँडफिलमधून 2 किलो कचरा वाचवला",
    impactStat2: "मिथेन उत्सर्जन कमी करते",
    impactStat3: "नैसर्गिकरित्या मातीचे आरोग्य वाढवते",
    
    // Pricing
    pricePerKg: "प्रति किलो किंमत",
    orderNow: "आता ऑर्डर करा",
    contactUs: "संपर्क साधा",
    
    // Admin
    adminTitle: "MongoDB कनेक्शन सेटअप",
    adminDesc: "कचरा संकलन प्रणालीसाठी तुमचे MongoDB डेटाबेस कनेक्शन कॉन्फिगर करा",
    connectionString: "कनेक्शन स्ट्रिंग",
    databaseName: "डेटाबेसचे नाव",
    testConnection: "कनेक्शन तपासा",
    saveConfiguration: "कॉन्फिगरेशन जतन करा",
    
    // Wet Waste Selling
    sellWasteTitle: "तुमचा ओला कचरा विका",
    sellWasteSubtitle: "तुमचा सेंद्रिय कचरा रोख रकमेत रूपांतरित करा",
    sellWasteDesc: "आमच्या कचरा-ते-संपत्ती कार्यक्रमात सामील व्हा आणि स्वच्छ पर्यावरणासाठी योगदान देताना पैसे कमवा. आम्ही तुमचा सेंद्रिय स्वयंपाकघरातील कचरा खरेदी करतो आणि त्याचे मूल्यवान खत बनवतो.",
    earnMoney: "पैसे कमवा",
    earnMoneyDesc: "तुमच्या सेंद्रिय कचऱ्याच paraयोगदानासाठी पेमेंट मिळवा",
    environmentalImpact: "पर्यावरणीय प्रभाव",
    environmentalImpactDesc: "लँडफिल कचरा आणि प्रदूषण कमी करण्यात मदत करा",
    freePickup: "मोफत पिकअप",
    freePickupDesc: "आम्ही तुमच्या दारातून कचरा गोळा करतो",
    quickProcess: "द्रुत प्रक्रिया",
    quickProcessDesc: "सोपी बुकिंग आणि तत्काळ पिकअप शेड्यूलिंग",
    pricingTitle: "प्रति किलोग्राम किंमत",
    startSelling: "विक्री सुरू करा",
    joinFamilies: "1000+ कुटुंबांमध्ये सामील व्हा जे आधीच कचऱ्यापासून कमाई करत आहेत!",
    startJourney: "आजच तुमची कचरा-ते-संपत्ती प्रवास सुरू करा",
    
    // Video Section
    videoTitle: "बघा आणि शिका",
    videoSubtitle: "EcoCompost कसे कार्य करते",
    videoDesc: "आमचे प्लॅटफॉर्म प्रभावीपणे कसे वापरायचे हे समजून घेण्यासाठी तुमच्या पसंतीच्या भाषेत आमचे ट्यूटोरियल व्हिडिओ बघा. फक्त काही मिनिटांत सर्वकाही जाणून घ्या!",
    chooseLanguage: "तुमची भाषा निवडा",
    englishTutorial: "इंग्रजी ट्यूटोरियल",
    hindiTutorial: "हिंदी ट्यूटोरियल",
    marathiTutorial: "मराठी ट्यूटोरियल",
    whatYoullLearn: "तुम्ही काय शिकाल",
    multiLanguageSupport: "बहु-भाषा समर्थन",
    multiLanguageSupportDesc: "इंग्रजी, हिंदी आणि मराठीमध्ये उपलब्ध",
    easyToUnderstand: "समजण्यास सोपे",
    easyToUnderstandDesc: "चरण-दर-चरण दृश्य मार्गदर्शन",
    quickLearning: "द्रुत शिकणे",
    quickLearningDesc: "5 मिनिटांत सर्वकाही शिका",
    readyToGetStarted: "सुरुवात करण्यासाठी तयार आहात?",
    afterWatching: "ट्यूटोरियल बघून झाल्यानंतर, कचरा व्यवस्थापन, खत खरेदी आणि हिरव्या पर्यावरणासाठी योगदान देण्यासाठी आमचे प्लॅटफॉर्म कसे वापरायचे हे तुम्हाला नक्की माहित होईल.",
    joinOurCommunity: "आमच्या समुदायात सामील व्हा",
    learnMore: "अधिक जाणून घ्या",
    
    // Mission & Vision
    missionVisionTitle: "आमचे मिशन आणि दृष्टीकोन",
    missionVisionSubtitle: "एकत्र स्थायी भविष्याचे निर्माण",
    missionVisionDesc: "EcoCompost मागील प्रेरणा शोधा आणि भविष्यातील पिढ्यांसाठी स्वच्छ, हिरवे आणि अधिक स्थायी जग बनवण्यासाठी आम्ही कसे एकत्र काम करत आहोत हे समजून घ्या.",
    ourMission: "आमचे मिशन",
    environmentalProtection: "पर्यावरण संरक्षण",
    environmentalProtectionDesc: "स्थायी कचरा व्यवस्थापन पद्धतींद्वारे आपल्या ग्रहाचे संरक्षण करणे",
    communityBuilding: "समुदाय निर्माण",
    communityBuildingDesc: "पर्यावरण-जागरूक व्यक्ती आणि कुटुंबांचा समुदाय बनवणे",
    economicEmpowerment: "आर्थिक सक्षमीकरण",
    economicEmpowermentDesc: "कचरा-ते-संपत्ती कार्यक्रमांद्वारे आर्थिक संधी निर्माण करणे",
    globalImpact: "जागतिक प्रभाव",
    globalImpactDesc: "जागतिक स्थिरता ध्येये आणि हवामान कारवाईत योगदान देणे",
    visionGoals: "आमचे दृष्टीकोन ध्येये",
    zeroWasteCities: "शून्य कचरा शहरे",
    zeroWasteCitiesDesc: "2030 पर्यंत शहरांना शून्य-कचरा समुदायांमध्ये रूपांतरित करणे",
    carbonNeutral: "कार्बन तटस्थ",
    carbonNeutralDesc: "आमच्या सर्व ऑपरेशन्समध्ये कार्बन तटस्थता साध्य करणे",
    millionFamilies: "10 लाख कुटुंबे",
    millionFamiliesDesc: "10 लाख कुटुंबांना स्थायी पद्धतींमध्ये गुंतवणे",
    greenEconomy: "हिरवी अर्थव्यवस्था",
    greenEconomyDesc: "एक समृद्ध चक्रीय अर्थव्यवस्था इकोसिस्टम निर्माण करणे",
    ourImpactSoFar: "आतापर्यंत आमचा प्रभाव",
    familiesConnected: "जोडलेली कुटुंबे",
    wasteProcessed: "प्रक्रिया केलेला कचरा",
    co2TonsSaved: "वाचवलेले CO2 टन",
    activeOperations: "सक्रिय ऑपरेशन्स",
    readyToBePart: "बदलाचा भाग बनण्यासाठी तयार आहात?",
    joinOurMission: "स्थायी भविष्य निर्माण करण्यासाठी आमच्या मिशनमध्ये सामील व्हा",
    
    // Leaderboard
    leaderboardTitle: "समुदाय लीडरबोर्ड",
    leaderboardSubtitle: "शीर्ष कचरा योगदानकर्ते",
    leaderboardDesc: "आमच्या इको-योद्ध्यांच्या समुदायात सामील व्हा आणि तुम्ही कसे बदल आणू शकता ते पहा. प्रत्येक योगदान स्वच्छ, हिरव्या भविष्याकडे मोजले जाते!",
    totalContributors: "एकूण योगदानकर्ते",
    wasteProcessed: "प्रक्रिया केलेला कचरा",
    co2Saved: "वाचवलेले CO2",
    topContributorsThisMonth: "या महिन्यातील शीर्ष योगदानकर्ते",
    earnPoints: "प्रत्येक किलोसाठी गुण मिळवा",
    monthlyRewards: "मासिक बक्षिसे",
    communityRecognition: "समुदाय मान्यता",
    joinTheLeaderboard: "लीडरबोर्डमध्ये सामील व्हा!",
    startContributing: "आमच्या कचरा व्यवस्थापन कार्यक्रमात योगदान देणे सुरू करा आणि लीडरबोर्डवर चढा.",
    
    // Partners Section
    partnerTitle: "आमच्याशी भागीदारी करा",
    partnerSubtitle: "सरकारी अधिकारी आणि किरकोळ विक्रेते",
    partnerDesc: "स्थायी भविष्य निर्माण करण्यासाठी आमच्या मिशनमध्ये सामील व्हा. तुम्ही सरकारी अधिकारी असाल किंवा किरकोळ विक्रेता असाल, आमच्याकडे भागीदारीच्या संधी आहेत ज्या तुम्हाला वास्तविक प्रभाव टाकण्यात मदत करू शकतात.",
    governmentOfficers: "सरकारी अधिकारी",
    governmentOfficersDesc: "स्थायी कचरा व्यवस्थापन धोरणे आणि कार्यक्रम तयार करण्यासाठी आमच्याशी हात मिळवा.",
    retailersBusinesses: "किरकोळ विक्रेते आणि व्यवसाय",
    retailersBusinessesDesc: "तुमच्या ग्राहकांना पर्यावरण-अनुकूल उत्पादने आणि सेवा प्रदान करण्यासाठी आमच्याशी भागीदारी करा.",
    partnershipBenefits: "भागीदारी फायदे",
    policyDevelopmentSupport: "धोरण विकास समर्थन",
    dataAnalyticsReports: "डेटा आणि विश्लेषण अहवाल",
    communityEngagementPrograms: "समुदाय सहभाग कार्यक्रम",
    environmentalImpactTracking: "पर्यावरणीय प्रभाव ट्रॅकिंग",
    whiteLabelProducts: "व्हाइट-लेबल उत्पादने",
    bulkSupplyAgreements: "थोक पुरवठा करार",
    marketingSupport: "मार्केटिंग समर्थन",
    revenueSharingModel: "उत्पन्न सामायिकरण मॉडेल",
    getInTouch: "संपर्कात रहा",
    contactUsForPartnership: "भागीदारीसाठी आमच्याशी संपर्क साधा",
    successStories: "यशाच्या कथा",
    achievement: "प्राप्ती:",
    impact: "प्रभाव:",
    readyToMakeDifference: "बदल आणण्यासाठी तयार आहात?",
    joinOurGrowingNetwork: "स्थायी भविष्य निर्माण करण्यात मदत करण्यासाठी आमच्या वाढत्या नेटवर्कमध्ये सामील व्हा. एकत्र आपण कचरा व्यवस्थापन आणि पर्यावरण संरक्षणावर वास्तविक प्रभाव टाकू शकतो.",
    startPartnership: "भागीदारी सुरू करा",
    callUsNow: "आता कॉल करा",
    
    // Join Initiative
    joinOurInitiative: "आमच्या पहलात सामील व्हा",
    joinInitiativeDesc: "तरुण एक स्वच्छ, हिरव्या भविष्यासाठी चालना देऊ शकतात. लँडफिलमधून सेंद्रिय कचरा दूर करून, आम्ही मिथेन उत्सर्जन कमी करतो, पोषक तत्वांनी समृद्ध खत तयार करतो, आणि लवचिक शहरी पारिस्थितिकी तंत्र निर्माण करतो.",
    getInvolved: "सहभागी व्हा",
    getInvolvedDesc: "आमच्या इको-योद्ध्यांच्या समुदायात सामील व्हा आणि आपल्या शहरात वास्तविक बदल आणा.",
    followUs: "आम्हाला फॉलो करा",
    followUsDesc: "आमच्या नवीनतम पहलांसह आणि यशाच्या कथा असताना अपडेट रहा.",
    contactUs: "संपर्क साधा",
    contactUsDesc: "प्रश्न आहेत? आम्ही तुम्हाला सुरुवात करण्यात मदत करण्यासाठी येथे आहोत.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
