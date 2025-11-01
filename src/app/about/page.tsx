import { Metadata } from 'next';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: '개발자 소개 페이지',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          안녕하세요! 개발자입니다.
        </p>
      </div>

      {/* Self Introduction */}
      <section className="mb-16 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          자기소개
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            안녕하세요! 저는 문제 해결을 좋아하고 새로운 기술을 배우는 것에 열정적인 개발자입니다.
            사용자 경험을 최우선으로 생각하며, 깔끔하고 유지보수가 쉬운 코드를 작성하기 위해 노력합니다.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            웹 개발을 중심으로 프론트엔드부터 백엔드까지 다양한 기술 스택을 활용하여
            풀스택 개발을 진행하고 있습니다. 특히 사용자에게 가치를 전달하는 서비스를
            만드는 것에 큰 보람을 느낍니다.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            이 블로그에서는 개발하면서 배운 것들, 문제 해결 과정, 그리고 기술에 대한
            생각들을 공유하고 있습니다.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          기술 스택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Frontend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                React / Next.js
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                TypeScript
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                HTML5 / CSS3
              </li>
            </ul>
          </div>

          {/* Backend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
              Backend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Node.js
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Express
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                RESTful API
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Database (SQL/NoSQL)
              </li>
            </ul>
          </div>

          {/* Tools & Others */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              Tools & DevOps
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Git / GitHub
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Docker
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                CI/CD
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                VS Code
              </li>
            </ul>
          </div>

          {/* Learning */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
              Currently Learning
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Next.js 16
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                React Server Components
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                System Design
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Algorithm & Data Structures
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="mb-16 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          경력
        </h2>
        <div className="space-y-6">
          {/* Career Item 1 */}
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                회사명 / 직책
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                2023.01 - 현재
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              프로젝트 및 업무 내용 설명
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>주요 업무 및 성과 1</li>
              <li>주요 업무 및 성과 2</li>
              <li>주요 업무 및 성과 3</li>
            </ul>
          </div>

          {/* Career Item 2 */}
          <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                이전 회사명 / 직책
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                2021.03 - 2022.12
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              프로젝트 및 업무 내용 설명
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>주요 업무 및 성과 1</li>
              <li>주요 업무 및 성과 2</li>
            </ul>
          </div>

          {/* Add more career items as needed */}
        </div>
      </section>

      {/* Contact */}
      <section className="animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          연락처
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            협업이나 프로젝트 문의는 언제든 환영합니다! 아래 연락처로 편하게 연락주세요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group border border-gray-200 dark:border-gray-700"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                <div className="font-medium text-gray-900 dark:text-white">your.email@example.com</div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group border border-gray-200 dark:border-gray-700"
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                <Github className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">GitHub</div>
                <div className="font-medium text-gray-900 dark:text-white">@yourusername</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group border border-gray-200 dark:border-gray-700"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</div>
                <div className="font-medium text-gray-900 dark:text-white">@yourusername</div>
              </div>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group border border-gray-200 dark:border-gray-700"
            >
              <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg group-hover:bg-sky-200 dark:group-hover:bg-sky-900/50 transition-colors">
                <Twitter className="w-5 h-5 text-sky-500 dark:text-sky-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Twitter</div>
                <div className="font-medium text-gray-900 dark:text-white">@yourusername</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
