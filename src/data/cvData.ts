export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  responsibilities: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
}

export interface CVData {
  name: string;
  title: string;
  heroIntro: string;
  heroSupporting: string;
  phone: string;
  email: string;
  location: string;
  whatsappUrl: string;
  phoneUrl: string;
  emailUrl: string;
  profileHighlights: {
    title: string;
    description: string;
  }[];
  skills: string[];
  experiences: ExperienceItem[];
  languages: string[];
  education: EducationItem;
  license: string;
}

export const cvData: CVData = {
  name: 'Rishiram Pokhrel',
  title: 'Warehouse Supervisor',
  heroIntro: 'Warehouse professional with 15+ years of experience in operations, inventory control, and distribution.',
  heroSupporting:
    'Experienced in Fruits & Vegetables, Non-Food, FMCG, DPH, and LHH items, with experience in delivery driving, team coordination, warehouse operations, and route management.',
  phone: '+97433046181',
  email: 'rishyram.2022@gmail.com',
  location: 'Abu Hamour, Doha, Qatar',
  whatsappUrl: 'https://wa.me/97433046181',
  phoneUrl: 'tel:+97433046181',
  emailUrl: 'mailto:rishyram.2022@gmail.com',
  license: 'Qatar Light Driving License (Manual)',
  profileHighlights: [
    {
      title: '15+ Years of Experience',
      description: 'Extensive track record in supply chain logistics, high-volume inventory, and cross-functional operations across Qatar.',
    },
    {
      title: 'Warehouse Operations',
      description: 'Supervising receiving, staging, sorting, climate-controlled storage, and dispatch workflows to meet strict SLAs.',
    },
    {
      title: 'Inventory Control',
      description: 'Precision stock accuracy, routine audits, discrepancy resolution, and product shelf-life preservation.',
    },
    {
      title: 'Distribution Management',
      description: 'Managing seamless goods transportation, daily fulfillment schedules, and retail outlet replenishment.',
    },
    {
      title: 'Fruits & Vegetables Handling',
      description: 'Specialized expertise in perishable goods handling, freshness preservation, and banana ripening room cycles.',
    },
    {
      title: 'FMCG, Non-Food, DPH & LHH Items',
      description: 'Comprehensive inventory handling across food and non-food product lines, domestic care, and hygiene goods.',
    },
    {
      title: 'Delivery Driving',
      description: 'Hands-on experience delivering to commercial hotels, catering partners, and retail supermarket branches.',
    },
    {
      title: 'Team Management',
      description: 'Leading, training, and coordinating warehouse crews, forklift operators, and drivers for peak operational efficiency.',
    },
    {
      title: 'Route Management',
      description: 'In-depth route optimization across Doha and Qatar municipalities for timely, cost-effective dispatches.',
    },
    {
      title: 'Qatar Light Driving License (Manual)',
      description: 'Valid Qatar manual driving license with verified clean safety track record and local route familiarity.',
    },
  ],
  skills: [
    'Warehouse Management & Supervision',
    'Inventory Control & Stock Accuracy',
    'Fruits & Vegetables Handling',
    'FMCG, Non-Food, DPH & LHH Items',
    'Receiving, Dispatch & Documentation',
    'Computer Basic Knowledge',
    'Safe and Punctual Driving',
    'Local Route Understanding (Qatar)',
    'Forklift Operation',
    'Responsible & Self-Motivated',
    'Time Management & Work Planning',
    'Customer-focused Service with Attention to Quality and Safety',
    'Staff Bus Driving Experience',
    'Delivery Driving',
  ],
  experiences: [
    {
      role: 'Warehouse Supervisor',
      company: 'Souq Al Baladi',
      location: 'Qatar',
      period: '2024 – Present',
      isCurrent: true,
      responsibilities: [
        'Manage warehouse operations, inventory, and staff.',
        'Ensure timely order fulfillment and compliance with safety standards.',
        'Coordinate with logistics and procurement for smooth supply chain flow.',
        'Implement process improvements to boost efficiency and accuracy.',
      ],
    },
    {
      role: 'Delivery Driver – Fruits & Vegetables',
      company: 'Al Rawasi Fresh Food Company',
      location: 'Qatar',
      period: '2022 – 2024',
      responsibilities: [
        'Handled customer orders, prepared items, and ensured timely deliveries to hotels, catering services, and Meera outlets.',
        'Built strong customer relationships by taking accurate orders and providing reliable service.',
        'Managed delivery schedules and maintained product quality during transportation.',
        'Supported sales activities by promoting company products and assisting clients with inquiries.',
        'Coordinated with catering and hospitality teams to meet bulk order requirements.',
        'Delivered fruits and vegetables to Al Meera outlets and customers.',
        'Good understanding of local delivery routes in Qatar.',
        'Ensured timely and safe delivery of goods.',
      ],
    },
    {
      role: 'Warehouse Supervisor / Warehouse Receiver / Dispatch & Banana Ripening / Forklift Operator',
      company: 'Al Read Fresh Food Company',
      location: 'Qatar',
      period: '2014 – 2022',
      responsibilities: [
        'Supervised warehouse operations, including receiving, dispatch, and inventory control.',
        'Managed banana ripening process to meet quality and market standards.',
        'Operated forklifts and other equipment to ensure safe handling of goods.',
        'Coordinated logistics and staff to maintain smooth supply chain operations.',
        'Ensured compliance with safety, hygiene, and company procedures.',
      ],
    },
    {
      role: 'Merchandiser',
      company: 'Abu Khalifa Company',
      location: 'Qatar',
      period: '2009 – 2012',
      responsibilities: [
        'Arranged and displayed products to attract customers.',
        'Monitored stock and ensured timely replenishment.',
        'Analyzed sales to improve product performance.',
        'Assisted with promotions and pricing.',
        'Coordinated with suppliers and sales team.',
        'Maintained store cleanliness and proper labeling.',
      ],
    },
  ],
  languages: ['Nepali', 'Hindi', 'Arabic', 'English'],
  education: {
    degree: 'Second Higher Education',
    institution: 'Kalika MA. BI.',
    location: 'Malarani-4, Khana, Arghakhanchi, Nepal',
  },
};
