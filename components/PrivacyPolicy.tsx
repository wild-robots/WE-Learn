
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#1a050d] text-white pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="prose prose-invert prose-blue max-w-none space-y-8 text-white/80">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>
                            WE Learn ("we", "our", or "us") is an open-source educational platform dedicated to empowering women through cohort-based learning.
                            We respect your privacy and are committed to protecting the personal information you share with us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p>We collect information to provide and improve our educational services:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Google Account Information:</strong> When you sign in with Google, we collect your name, email address, and profile picture to create your account.</li>
                            <li><strong>Course Data:</strong> If you use our Google Classroom integration, we access information about the courses you create or join, including rosters and coursework, solely to facilitate the learning experience.</li>
                            <li><strong>Usage Data:</strong> We may collect anonymous data on how you interact with our platform to improve user experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Create and manage your user account.</li>
                            <li>Facilitate cohort creation and enrollment via Google Classroom.</li>
                            <li>Personalize your learning path using AI services (e.g., generating course syllabi).</li>
                            <li>Communicate with you regarding your courses and platform updates.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                        <p>
                            We do not sell your personal data. We may share data with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Service Providers:</strong> Third-party vendors (like Firebase for hosting/auth, Groq for AI) who assist in operating our platform.</li>
                            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Google User Data</h2>
                        <p>
                            Our use and transfer to any other app of information received from Google APIs will adhere to the
                            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> Google API Services User Data Policy</a>,
                            including the Limited Use requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Open Source</h2>
                        <p>
                            WE Learn is an open-source project. You can review our codebase to understand exactly how your data is handled.
                            However, this policy applies to the hosted version of the application managed by the WE Learn team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at privacy@we-learn.org (placeholder).
                        </p>
                    </section>

                    <div className="pt-8 text-sm text-white/40">
                        Last Updated: {new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
