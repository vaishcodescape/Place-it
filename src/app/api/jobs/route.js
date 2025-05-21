import { config } from '../config';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const jobType = searchParams.get('jobType') || '';
  const location = searchParams.get('location') || '';
  
  try {
    // Check if India-specific location is selected
    const isIndiaLocation = 
      location === 'India' || 
      location === 'Bangalore' || 
      location === 'Mumbai' || 
      location === 'Delhi' || 
      location === 'Hyderabad' || 
      location === 'Chennai' || 
      location === 'Pune' || 
      location === 'Kolkata' ||
      location === 'Noida' ||
      location === 'Gurgaon';
    
    // Handle regular Remotive API request for remote jobs
    let remotiveJobs = [];
    
    // Build URL for Remotive API
    let url = `${config.remotive.baseUrl}`;
    
    // Add category filter if available
    if (query) {
      url += `?search=${encodeURIComponent(query)}`;
    }
    
    // Make request to Remotive API for remote jobs
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.jobs && Array.isArray(data.jobs)) {
        // Filter jobs by job type
        let filteredJobs = data.jobs;
        
        if (jobType) {
          if (jobType === 'Full-time') {
            filteredJobs = filteredJobs.filter(job => 
              job.job_type?.toLowerCase().includes('full') || 
              job.job_type?.toLowerCase() === 'full_time'
            );
          } else if (jobType === 'Part-time') {
            filteredJobs = filteredJobs.filter(job => 
              job.job_type?.toLowerCase().includes('part') || 
              job.job_type?.toLowerCase() === 'part_time'
            );
          } else if (jobType === 'Contract') {
            filteredJobs = filteredJobs.filter(job => 
              job.job_type?.toLowerCase().includes('contract')
            );
          } else if (jobType === 'Internship') {
            filteredJobs = filteredJobs.filter(job => 
              job.job_type?.toLowerCase().includes('intern')
            );
          } else if (jobType === 'Freelance') {
            filteredJobs = filteredJobs.filter(job => 
              job.job_type?.toLowerCase().includes('freelance')
            );
          }
        }
        
        // Filter by location for non-India specific locations
        if (location && !isIndiaLocation) {
          filteredJobs = filteredJobs.filter(job => 
            job.candidate_required_location?.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        // Map Remotive response to our job listing format
        remotiveJobs = filteredJobs.map((job, index) => ({
          id: job.id || `remote-${index}`,
          title: job.title || 'Unknown Title',
          company: job.company_name || 'Unknown Company',
          location: job.candidate_required_location || 'Remote',
          type: job.job_type || 'Full-time',
          description: job.description || 'No description provided',
          requirements: job.required_skills?.join(', ') || 'Not specified',
          salary: job.salary || 'Competitive',
          applicationUrl: job.url || job.application_url || '#',
          tags: job.tags || [],
          category: job.category || 'Software Development',
          logoUrl: job.company_logo_url || null,
          publicationDate: job.publication_date || null,
          isRemote: true
        }));
      }
    } else {
      console.error(`Remotive API responded with status: ${response.status}`);
    }
    
    // If India location is selected, include India-specific job postings
    let indiaJobs = [];
    if (isIndiaLocation || !location) {
      indiaJobs = getIndiaJobs(query, jobType, location);
    }
    
    // Combine both sets of jobs
    let combinedJobs = [...remotiveJobs];
    
    // If we're looking for India-specific location, prioritize India jobs or add them to the list
    if (isIndiaLocation) {
      combinedJobs = [...indiaJobs, ...remotiveJobs.filter(job => 
        job.location.toLowerCase().includes('india') || 
        job.location.toLowerCase().includes('anywhere')
      )];
    } else if (!location) {
      // If no location is specified, include India jobs but don't prioritize
      combinedJobs = [...remotiveJobs, ...indiaJobs];
    }
    
    // If no jobs found or API failed, return mock data
    if (combinedJobs.length === 0) {
      return Response.json(getMockData(query, jobType, location));
    }
    
    return Response.json(combinedJobs);
  } catch (error) {
    console.error('Error fetching job listings:', error);
    return Response.json(getMockData(query, jobType, location));
  }
}

// Function to get India-specific jobs
function getIndiaJobs(query, jobType, location) {
  const indiaJobs = [
    {
      id: 'india-1',
      title: 'Software Engineer',
      company: 'Infosys',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Developing enterprise software solutions for global clients. Responsibilities include coding, testing, and deployment of applications.',
      requirements: 'B.Tech/B.E. in Computer Science, 2+ years experience with Java, Spring Boot, and React',
      salary: '₹8,00,000 - ₹14,00,000',
      applicationUrl: 'https://www.infosys.com/careers/',
      tags: ['Java', 'Spring Boot', 'React', 'Microservices'],
      category: 'Software Development',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Infosys_logo.svg/2560px-Infosys_logo.svg.png',
      publicationDate: '2023-06-15',
      isRemote: false
    },
    {
      id: 'india-2',
      title: 'Data Scientist',
      company: 'Tata Consultancy Services',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Analyzing large datasets to extract insights and build predictive models. Working with business teams to implement data-driven solutions.',
      requirements: 'M.Sc/M.Tech in Statistics or Computer Science, experience with Python, R, and SQL',
      salary: '₹12,00,000 - ₹18,00,000',
      applicationUrl: 'https://www.tcs.com/careers',
      tags: ['Python', 'Machine Learning', 'SQL', 'Data Analysis'],
      category: 'Data Science',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
      publicationDate: '2023-05-22',
      isRemote: false
    },
    {
      id: 'india-3',
      title: 'Frontend Developer',
      company: 'Flipkart',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Building responsive user interfaces for India\'s leading e-commerce platform. Implementing new features and optimizing user experience.',
      requirements: 'B.Tech in Computer Science or related field, 3+ years experience with React.js and JavaScript',
      salary: '₹15,00,000 - ₹25,00,000',
      applicationUrl: 'https://www.flipkartcareers.com',
      tags: ['React', 'JavaScript', 'CSS', 'Web Performance'],
      category: 'Frontend Development',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png',
      publicationDate: '2023-06-05',
      isRemote: false
    },
    {
      id: 'india-4',
      title: 'Backend Engineer',
      company: 'Swiggy',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Developing scalable backend services for India\'s food delivery platform. Optimizing performance for millions of concurrent users.',
      requirements: 'B.Tech/M.Tech in Computer Science, 2+ years experience with Java/Kotlin, Spring Boot, and Kubernetes',
      salary: '₹18,00,000 - ₹30,00,000',
      applicationUrl: 'https://careers.swiggy.com',
      tags: ['Java', 'Kotlin', 'Spring Boot', 'Kubernetes', 'Microservices'],
      category: 'Backend Development',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1200px-Swiggy_logo.svg.png',
      publicationDate: '2023-06-10',
      isRemote: false
    },
    {
      id: 'india-5',
      title: 'Android Developer',
      company: 'Paytm',
      location: 'Noida, India',
      type: 'Full-time',
      description: 'Building and maintaining Android applications for India\'s leading digital payments platform. Implementing new features and improving user experience.',
      requirements: 'B.Tech in Computer Science, 3+ years experience with Android SDK, Kotlin, and Java',
      salary: '₹12,00,000 - ₹20,00,000',
      applicationUrl: 'https://paytm.com/careers',
      tags: ['Android', 'Kotlin', 'Java', 'Mobile Development'],
      category: 'Mobile Development',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%282020%29.svg/2560px-Paytm_Logo_%282020%29.svg.png',
      publicationDate: '2023-05-28',
      isRemote: false
    },
    {
      id: 'india-6',
      title: 'DevOps Engineer',
      company: 'Zomato',
      location: 'Gurgaon, India',
      type: 'Full-time',
      description: 'Managing cloud infrastructure and CI/CD pipelines for food delivery platform. Automating deployment processes and ensuring system reliability.',
      requirements: 'B.Tech in Computer Science or related field, experience with AWS, Kubernetes, and Jenkins',
      salary: '₹16,00,000 - ₹28,00,000',
      applicationUrl: 'https://www.zomato.com/careers',
      tags: ['AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Jenkins'],
      category: 'DevOps',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/600px-Zomato_logo.png',
      publicationDate: '2023-06-08',
      isRemote: false
    },
    {
      id: 'india-7',
      title: 'Full Stack Developer',
      company: 'Freshworks',
      location: 'Chennai, India',
      type: 'Full-time',
      description: 'Developing end-to-end solutions for customer engagement software. Building both frontend and backend components of web applications.',
      requirements: 'B.Tech in Computer Science, 3+ years experience with JavaScript, Node.js, and React',
      salary: '₹14,00,000 - ₹24,00,000',
      applicationUrl: 'https://www.freshworks.com/careers',
      tags: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Full Stack'],
      category: 'Full Stack Development',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Freshworks_Logo.svg/2560px-Freshworks_Logo.svg.png',
      publicationDate: '2023-06-12',
      isRemote: false
    },
    {
      id: 'india-8',
      title: 'Machine Learning Engineer',
      company: 'Ola',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Developing machine learning models to optimize ride allocation and pricing. Implementing algorithms to improve operational efficiency.',
      requirements: 'M.Tech/PhD in Computer Science or related field, experience with Python, TensorFlow/PyTorch',
      salary: '₹20,00,000 - ₹35,00,000',
      applicationUrl: 'https://www.olacabs.com/careers',
      tags: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science'],
      category: 'Machine Learning',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Ola_Cabs_logo.svg/1200px-Ola_Cabs_logo.svg.png',
      publicationDate: '2023-05-25',
      isRemote: false
    },
    {
      id: 'india-9',
      title: 'Product Manager',
      company: 'BYJU\'S',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Leading product development for India\'s largest educational technology company. Defining product vision, strategy, and roadmap.',
      requirements: 'MBA from top-tier institute, 4+ years of product management experience',
      salary: '₹25,00,000 - ₹40,00,000',
      applicationUrl: 'https://byjus.com/careers',
      tags: ['Product Management', 'EdTech', 'Agile', 'User Research'],
      category: 'Product Management',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Byju%27s_logo.svg/2560px-Byju%27s_logo.svg.png',
      publicationDate: '2023-06-03',
      isRemote: false
    },
    {
      id: 'india-10',
      title: 'UI/UX Designer',
      company: 'MakeMyTrip',
      location: 'Gurgaon, India',
      type: 'Full-time',
      description: 'Designing user interfaces for India\'s leading travel booking platform. Creating wireframes, prototypes, and visual designs.',
      requirements: 'Bachelor\'s degree in Design, 3+ years experience with Figma and Adobe Creative Suite',
      salary: '₹12,00,000 - ₹20,00,000',
      applicationUrl: 'https://careers.makemytrip.com',
      tags: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'User Research'],
      category: 'Design',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Makemytrip_Logo.svg/2560px-Makemytrip_Logo.svg.png',
      publicationDate: '2023-05-30',
      isRemote: false
    },
    {
      id: 'india-11',
      title: 'Data Engineer',
      company: 'PhonePe',
      location: 'Bangalore, India',
      type: 'Full-time',
      description: 'Building data pipelines for digital payments platform. Designing and implementing data warehousing solutions.',
      requirements: 'B.Tech in Computer Science, 2+ years experience with Spark, Hadoop, and AWS',
      salary: '₹15,00,000 - ₹25,00,000',
      applicationUrl: 'https://www.phonepe.com/careers',
      tags: ['Apache Spark', 'Hadoop', 'AWS', 'Python', 'SQL'],
      category: 'Data Engineering',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png',
      publicationDate: '2023-06-07',
      isRemote: false
    },
    {
      id: 'india-12',
      title: 'iOS Developer',
      company: 'Jio',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Developing iOS applications for Jio\'s suite of digital services. Implementing new features and ensuring app performance.',
      requirements: 'B.Tech in Computer Science, 3+ years experience with Swift and iOS SDK',
      salary: '₹14,00,000 - ₹22,00,000',
      applicationUrl: 'https://careers.jio.com',
      tags: ['iOS', 'Swift', 'Objective-C', 'Mobile Development'],
      category: 'Mobile Development',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Jio_logo.svg/1200px-Jio_logo.svg.png',
      publicationDate: '2023-06-01',
      isRemote: false
    }
  ];
  
  let filteredJobs = indiaJobs;
  
  // Apply query filter if provided
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) || 
      job.company.toLowerCase().includes(lowercaseQuery) || 
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  // Apply job type filter if provided
  if (jobType) {
    filteredJobs = filteredJobs.filter(job => job.type === jobType);
  }
  
  // Apply location filter if provided and it's an India location
  if (location && location !== 'India') {
    const lowercaseLocation = location.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(lowercaseLocation)
    );
  }
  
  return filteredJobs;
}

// Mock data to use as a fallback, filtered by the provided parameters
function getMockData(query, jobType, location) {
  const mockJobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Remote / Mountain View, CA',
      type: 'Full-time',
      description: 'Developing and maintaining Google Search algorithms.',
      requirements: 'BS in Computer Science or related field, 3+ years of experience',
      salary: '$120,000 - $150,000',
      applicationUrl: 'https://careers.google.com/jobs',
      tags: ['Python', 'Java', 'Algorithms']
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Remote / Redmond, WA',
      type: 'Full-time',
      description: 'Leading product development for Microsoft Office suite.',
      requirements: 'MBA preferred, 5+ years of product management experience',
      salary: '$130,000 - $160,000',
      applicationUrl: 'https://careers.microsoft.com',
      tags: ['Product Management', 'Agile', 'SaaS']
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Amazon',
      location: 'Remote / Seattle, WA',
      type: 'Full-time',
      description: 'Building machine learning models for product recommendations.',
      requirements: 'MS/PhD in Computer Science, Statistics, or related field',
      salary: '$125,000 - $155,000',
      applicationUrl: 'https://www.amazon.jobs',
      tags: ['Python', 'Machine Learning', 'SQL']
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Apple',
      location: 'Remote / Cupertino, CA',
      type: 'Full-time',
      description: 'Designing intuitive user interfaces for Apple products.',
      requirements: 'Degree in Design, 3+ years of experience in UI/UX design',
      salary: '$110,000 - $140,000',
      applicationUrl: 'https://www.apple.com/careers',
      tags: ['Figma', 'UI Design', 'User Research']
    },
    {
      id: 5,
      title: 'Frontend Developer',
      company: 'Meta',
      location: 'Remote / Menlo Park, CA',
      type: 'Contract',
      description: 'Building responsive web applications using React.',
      requirements: '3+ years of experience with React and modern JavaScript',
      salary: '$100,000 - $130,000',
      applicationUrl: 'https://www.metacareers.com',
      tags: ['React', 'JavaScript', 'HTML/CSS']
    },
    {
      id: 6,
      title: 'Backend Engineer',
      company: 'Netflix',
      location: 'Remote / Los Gatos, CA',
      type: 'Full-time',
      description: 'Building scalable APIs and services for Netflix platform.',
      requirements: '5+ years of experience with Java or Python',
      salary: '$140,000 - $170,000',
      applicationUrl: 'https://jobs.netflix.com',
      tags: ['Java', 'Microservices', 'Cloud']
    },
    {
      id: 7,
      title: 'Machine Learning Engineer',
      company: 'OpenAI',
      location: 'Remote / San Francisco, CA',
      type: 'Full-time',
      description: 'Developing cutting-edge machine learning models for natural language processing.',
      requirements: 'MS/PhD in Machine Learning, 2+ years experience with deep learning frameworks',
      salary: '$150,000 - $200,000',
      applicationUrl: 'https://openai.com/careers',
      tags: ['PyTorch', 'TensorFlow', 'NLP']
    },
    {
      id: 8,
      title: 'DevOps Engineer',
      company: 'GitLab',
      location: 'Remote',
      type: 'Full-time',
      description: 'Automating CI/CD pipelines and managing cloud infrastructure.',
      requirements: '3+ years experience with Kubernetes, Docker, and cloud platforms',
      salary: '$125,000 - $155,000',
      applicationUrl: 'https://about.gitlab.com/jobs',
      tags: ['Kubernetes', 'Docker', 'AWS']
    }
  ];
  
  let filteredJobs = mockJobs;
  
  // Apply query filter if provided
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) || 
      job.company.toLowerCase().includes(lowercaseQuery) || 
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  // Apply job type filter if provided
  if (jobType) {
    filteredJobs = filteredJobs.filter(job => job.type === jobType);
  }
  
  // Apply location filter if provided
  if (location) {
    const lowercaseLocation = location.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(lowercaseLocation)
    );
  }
  
  return filteredJobs;
} 