import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "N-Byte Explorer Kit - Robotics",
    slug: "n-byte-explorer-kit-robotics",
    description:
      "The N-Byte Explorer Kit Robotics edition is a complete robotics learning kit featuring a microcontroller board, ultrasonic sensors, IR sensors, servo motors, DC motors, wheels, chassis, and a comprehensive project guidebook. Students learn to build, program, and control their own robots through hands-on projects that teach engineering, programming, and problem-solving skills.",
    shortDesc:
      "Build and program your own robots with the N-Byte Explorer Kit Robotics edition. Includes motors, sensors, and microcontroller.",
    category: "kit",
    images: [
      "/images/products/n-byte-explorer-kit.jpg",
      "/images/products/n-byte-explorer-kit-2.jpg",
    ],
    features: [
      "Microcontroller board with robotics firmware pre-installed",
      "2x DC motors with wheels for motion control",
      "Ultrasonic sensor for obstacle detection",
      "IR sensors for line following",
      "Servo motor for precise movements",
      "Robotics chassis with mounting hardware",
      "Step-by-step project guidebook (10+ projects)",
      "Online video tutorials and coding challenges",
    ],
    specifications: {
      "age_range": "8-18 years",
      "difficulty": "Beginner to Advanced",
      "microcontroller": "Arduino-compatible ATmega328P",
      "programming_language": "Block-based & C++",
      "sensors_included": "Ultrasonic, IR x2, Touch",
      "motors": "DC x2, Servo x1",
      "power": "6x AA batteries or USB",
      "battery_life": "4-6 hours continuous use",
      "box_contents": "50+ electronic components + mechanical parts",
      "warranty": "1 year",
    },
    tags: ["robotics", "arduino", "sensors", "motors", "beginner-friendly", "STEM"],
    inStock: true,
    isFeatured: true,
    brochureUrl: null,
    price: 3499,
    comparePrice: 4599,
  },
  {
    name: "N-Byte Explorer Kit - Coding & Programming",
    slug: "n-byte-explorer-kit-coding",
    description:
      "The N-Byte Explorer Kit Coding edition is designed to take students from block-based visual programming to real-world coding in Python and C++. With an integrated coding environment, LED matrix display, push buttons, and sound module, students learn programming fundamentals through interactive projects and challenges that make coding fun and engaging.",
    shortDesc:
      "Learn coding from Scratch to Python with the N-Byte Explorer Kit. Interactive projects make programming fun!",
    category: "kit",
    images: [
      "/images/products/n-byte-explorer-kit.jpg",
      "/images/products/n-byte-explorer-kit-2.jpg",
    ],
    features: [
      "Block-based visual programming (Scratch-like)",
      "Python programming for intermediate learners",
      "C++ for advanced users",
      "8x8 LED matrix display for visual outputs",
      "Push buttons and potentiometer for input",
      "Buzzer/sound module for audio feedback",
      "50+ coding challenges with increasing difficulty",
      "Built-in coding environment with simulator",
    ],
    specifications: {
      "age_range": "8-18 years",
      "difficulty": "Beginner to Advanced",
      "microcontroller": "ESP32 with WiFi/Bluetooth",
      "languages": "Block-based, Python, C++",
      "display": "8x8 LED Matrix",
      "input_devices": "4x Push buttons, 2x Potentiometers",
      "storage": "4MB Flash, 520KB SRAM",
      "connectivity": "USB-C, WiFi, Bluetooth",
      "battery": "Built-in 2000mAh Li-Po",
      "warranty": "1 year",
    },
    tags: ["coding", "programming", "python", "scratch", "STEM", "beginner-friendly"],
    inStock: true,
    isFeatured: true,
    brochureUrl: null,
    price: 2999,
    comparePrice: 3999,
  },
  {
    name: "N-Byte Explorer Kit - AI & Machine Learning",
    slug: "n-byte-explorer-kit-ai-ml",
    description:
      "The N-Byte Explorer Kit AI/ML edition introduces students to the fascinating world of artificial intelligence and machine learning. With a camera module, microphone, and powerful processor, students explore computer vision, speech recognition, gesture control, and predictive modeling through hands-on projects that demystify AI concepts and build future-ready skills.",
    shortDesc:
      "Explore AI and Machine Learning with the N-Byte Explorer Kit. Build smart projects with computer vision and voice recognition.",
    category: "kit",
    images: [
      "/images/products/n-byte-explorer-kit.jpg",
      "/images/products/n-byte-explorer-kit-2.jpg",
    ],
    features: [
      "Camera module for computer vision projects",
      "Microphone array for speech recognition",
      "Pre-trained ML models for image classification",
      "Train custom models with Teachable Machine integration",
      "Gesture recognition and motion tracking",
      "Natural language processing experiments",
      "AI-powered chatbot and virtual assistant projects",
      "Edge AI processing (no cloud dependency)",
    ],
    specifications: {
      "age_range": "12-18 years",
      "difficulty": "Intermediate to Advanced",
      "processor": "Dual-core AI accelerator chip",
      "camera": "5MP OV5640 with autofocus",
      "audio": "Dual MEMS microphone array",
      "memory": "8MB PSRAM + 16MB Flash",
      "ai_framework": "TensorFlow Lite Micro",
      "programming": "Python with AI libraries",
      "connectivity": "WiFi, Bluetooth 5.0",
      "warranty": "1 year",
    },
    tags: ["AI", "machine-learning", "computer-vision", "python", "advanced", "STEM"],
    inStock: true,
    isFeatured: true,
    brochureUrl: null,
    price: 4999,
    comparePrice: 6499,
  },
  {
    name: "N-Byte Explorer Kit - IoT & Electronics",
    slug: "n-byte-explorer-kit-iot",
    description:
      "The N-Byte Explorer Kit IoT & Electronics edition is the ultimate kit for building connected devices and smart systems. With WiFi and Bluetooth connectivity, a rich set of environmental sensors, relay modules, and cloud platform integration, students learn to build real-world IoT applications like smart home systems, weather stations, and automated monitoring solutions.",
    shortDesc:
      "Build connected IoT devices and smart systems with the N-Byte Explorer Kit. Sensors, WiFi, cloud integration.",
    category: "kit",
    images: [
      "/images/products/n-byte-explorer-kit.jpg",
      "/images/products/n-byte-explorer-kit-2.jpg",
    ],
    features: [
      "Built-in WiFi and Bluetooth connectivity",
      "Temperature, humidity, and pressure sensors",
      "Light intensity and UV sensors",
      "Soil moisture sensor for gardening projects",
      "Relay module for controlling appliances",
      "OLED display for data visualization",
      "Cloud platform integration (MQTT, HTTP)",
      "Mobile app for remote monitoring and control",
    ],
    specifications: {
      "age_range": "10-18 years",
      "difficulty": "Intermediate to Advanced",
      "microcontroller": "ESP32 dual-core 240MHz",
      "wireless": "WiFi 802.11 b/g/n, Bluetooth 4.2/5.0",
      "sensors": "DHT22, BMP280, LDR, UV, Soil moisture",
      "display": "0.96' OLED 128x64",
      "actuators": "Relay x2, RGB LED, Buzzer",
      "protocols": "MQTT, HTTP, TCP/IP, BLE",
      "power": "5V USB-C or 7-12V DC jack",
      "warranty": "1 year",
    },
    tags: ["IoT", "electronics", "sensors", "wifi", "smart-home", "STEM", "cloud"],
    inStock: true,
    isFeatured: true,
    brochureUrl: null,
    price: 3999,
    comparePrice: 5199,
  },
];

async function main() {
  console.log("Seeding N-Byte Explorer Kit products...");

  for (const product of products) {
    // Check if slug already exists
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (existing) {
      console.log(`  Updating: ${product.name}`);
      await prisma.product.update({
        where: { slug: product.slug },
        data: product,
      });
    } else {
      console.log(`  Creating: ${product.name}`);
      await prisma.product.create({
        data: product,
      });
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });