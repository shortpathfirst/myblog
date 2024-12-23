import config from "@/../next.config.mjs";
import styles from "@/ui/styles/homepage.module.css";

export const content = [
  {
    title: "D3",
    imageURL: `${config.basePath}/assets/skills/d3logo.svg`,
    description: <>
      <p> <strong>Data Visualization</strong> is presenting large data sets and metrics into charts,graphs or other graphic
        rapresentation that allow quick understanding for interpretation and analysis
      </p>
      <p className={styles.highlight}>
        D3 is a JavaScript library for producing dynamic and interactive data visualizations in web
        browsers.
        D3's low-level approach provides the building blocks for constructing flexible and highly
        customizable data representations.
      </p>

    </>,
    skills: ["Basic Charts", "Producing graphs for complex networks", "Geospatial maps"],
    projects: [
      { name: "", image: "https://placehold.co/400" },
      { name: "", image: "https://placehold.co/400" },
      { name: "", image: "https://placehold.co/400" }
    ],
  },
  {
    title: "React",
    imageURL: `${config.basePath}/assets/skills/react.png`,
    description: <>
      <p className={styles.highlight}>React is a a JavaScript library for building user interfaces in web applications.
        React uses a component-based architecture, where the UI is broken down into reusable
        components.
        It help to build single page application that update and render only the components that
        need to change.
      </p>

      <p>
        React promotes the use of various frameworks. Next.js is a popular one that also
        abstracts and automatically configures tooling needed for React, like bundling, compiling,
        and more. Putting enphasis on SSR and SSG.
      </p>
    </>,
    skills: ["Readable and mantainable architecture for easier testing.", "Basic concepts of React frameworks like NextJS and its SSG and SSR features."],
    projects: [
      { name: "MapDashboard", image: "https://placehold.co/400" },
      { name: "Blog", image: "https://placehold.co/400" },
      { name: "PowerliftingDatabase", image: "https://placehold.co/400" }
    ],
  },
  {
    title: "Angular",
    imageURL: `${config.basePath}/assets/skills/angular.jpg`,
    description: <>
      <p className={styles.highlight}>Angular is a development platform built on Typescript.
      
      <ul>
        <li>A component-based framework for building scalable web applications</li>
        <li>Feature libraris for routing, forms, materials</li>
        <li>Tools for build, test, and update your code.</li>
      </ul>
      </p>
      <p>
        Angular applications are perfect candidates for serving with a simple static HTML server. You
        don't need a server-side engine to dynamically compose application pages because Angular does
        that on the client-side.
      </p>
    </>,
    skills: [
      "Basic concepts: Data binding, content projections, guards, directives, routing, form groups and validation, rxjs",
    ],
    projects: [
      { name: "JudoClub", image: "https://placehold.co/400" },
      { name: "PizzaStore", image: "https://placehold.co/400" },
    ],
  },
  {
    title: "Tensorflow",
    imageURL: `${config.basePath}/assets/skills/tensorflow.png`,
    description: <>
      <p>An open source machine learning and artificial intelligence platform developed by google.
        Primary used for neural network make it possible to use ML directly in browser.
        Also enanched with cpu and gpu support with CUDA or OpenCL.
      </p>
    </>,
    skills: ["How to load and send data pre-made models using Tensors",
      "Writing Linear regression, Classification and CNN",
      "Transfer learning pretrained Tensorflow models."
    ],
    projects: [
      { name: "", image: "https://placehold.co/400" },
    ],
  },
  {
    title: "Python",
    imageURL: `${config.basePath}/assets/skills/python.webp`,
    description: <>
      <p>Machine learning principal concepts:
      </p>
      <ul>
        <li>Performing Explorative Data Analysis</li>
        <li>Linear Regression</li>
        <li>Classification</li>
        <li>SVC, SVM</li>
        <li>Clustering main algorithms</li>
        <li>PCA, TSNE</li>
        <li>Neural Networks, CNN</li>
      </ul>
    </>,
    skills: ["Readable and mantainable architecture for easier testing.", "Basic concepts of React frameworks like NextJS and its SSG and SSR features."],
  },
  {
    title: "Java",
    imageURL: `${config.basePath}/assets/skills/java.png`,
    description: <>
      <p><strong>Gradle</strong> is an open-source build automation tool designed to manage the development process of software projects.</p>
      <p><strong>Apache spark</strong> is an open-source data analytics engine that can process Big Data from multiple sources.</p>
      <p>A <strong>servlet</strong> is a Java module (a class) that extends the classical functionalities of a server in the model request/response</p>
      <p><strong>Nginx</strong> a popular open-source web server software that can also act as a reverse proxy, load balancer, and HTTP cache.</p>
      <div className={styles.imageList}>
        <img src={`${config.basePath}/assets/skills/gradle.png`} width={180} height={120} />
        <img src={`${config.basePath}/assets/skills/technologies-spark.webp`} width={180} height={120} />
        <img src={`${config.basePath}/assets/skills/nginx.png`} width={180} height={120} />
        <img src={`${config.basePath}/assets/skills/java.png`} width={180} height={120} />
      </div>
    </>,
    skills: ["Building simple Microservice with spark",
      "Using Spark Framework to build a gradle app and nginx as load balancer.",
      "Hadoop Map Reduce",
      "Building simple Servlet with an Apache Tomcat Server"
    ],
  },
  {
    title: "Docker",
    imageURL: `${config.basePath}/assets/skills/docker.jpg`,
    description: <>
      <p className={styles.highlight}>Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.
      </p>

      <p>
        Containerization is for scaling of application deployed in the cloud.
        The container becomes the unit for distributing and testing your application.
        What is a container? Containers are isolated processes for each of your app's components. Each component - the frontend - the Python API engine - the database - runs in its own isolated environment, completely isolated from everything else on your machine.
      </p>
    </>,
    skills: ["Creating docker file",
      "Creating and publishing docker image",
      "Run docker image in a EC2 Instance"
    ],
  },
]