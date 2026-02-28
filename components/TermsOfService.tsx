
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const TermsOfService: React.FC<Props> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFA] pt-24 px-4 pb-12">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

                <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using WE Learn, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
                        <p>
                            WE Learn provides an educational platform that connects learners, providing tools for cohort-based learning, course creation via AI, and integration with Google Classroom.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Conduct</h2>
                        <p>
                            You agree to use the service only for lawful educational purposes. You are strictly prohibited from:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Harassing, bullying, or intimidating other users.</li>
                            <li>Posting content that is hateful, violent, or sexually explicit.</li>
                            <li>Attempting to compromise the security of the platform.</li>
                            <li>Misusing the Google Classroom integration to spam or disrupt courses.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property (Open Source)</h2>
                        <p>
                            The code for WE Learn is open source and licensed under the MIT License.
                            However, the brand assets, user-generated content, and specific course materials hosted on this instance are protected by copyright and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Disclaimer of Warranties</h2>
                        <p>
                            The service is provided on an "as is" and "as available" basis. WE Learn makes no representations or warranties of any kind, express or implied, regarding the operation of the service or the information, content, or materials included.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
                        <p>
                            WE Learn shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Service.
                        </p>
                    </section>

                    <div className="pt-8 text-sm text-slate-400">
                        Last Updated: {new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
