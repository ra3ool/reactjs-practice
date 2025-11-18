export default function AboutView() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold  mb-4">About This Application</h1>
      <p className="text-lg mb-6">
        This application is a modern web platform built with React and Vite,
        designed to showcase the latest features and best practices in web
        development. It serves as a practical example of how to build a scalable
        and maintainable frontend application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our mission is to provide a comprehensive and interactive learning
            experience for developers. We aim to deliver a clear and concise
            demonstration of React concepts, state management, routing, and
            more.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>Component-based architecture</li>
            <li>Client-side routing with React Router</li>
            <li>State management with Zustand</li>
            <li>Dark/Light theme support</li>
            <li>Responsive design with Tailwind CSS</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold  mb-4">Meet the Team</h2>
        <p className="text-lg">
          This project is brought to you by a team of passionate developers
          dedicated to creating high-quality software and sharing knowledge with
          the community.
        </p>
      </div>
    </div>
  );
}
