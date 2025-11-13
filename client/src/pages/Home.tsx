import { useState, useEffect } from "react";
import ProgressStepper from "@/components/ProgressStepper";
import StudentDetailsForm from "@/components/StudentDetailsForm";
import SubjectPerformanceForm from "@/components/SubjectPerformanceForm";
import OtherParametersForm from "@/components/OtherParametersForm";
import ReportPreview from "@/components/ReportPreview";
import { generatePDF } from "@/lib/pdfGenerator";
import type { StudentDetails, SubjectPerformance, OtherParameters, MentoringReport } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { label: "Student Details", step: 1 },
  { label: "Subject Performance", step: 2 },
  { label: "Other Parameters", step: 3 },
  { label: "Review", step: 4 },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [otherParameters, setOtherParameters] = useState<OtherParameters | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setLogoDataUrl(canvas.toDataURL("image/png"));
      }
    };
    img.src = "/navodaya-logo.png";
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("mentoringData");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.studentDetails) setStudentDetails(data.studentDetails);
      if (data.subjectPerformance) setSubjectPerformance(data.subjectPerformance);
      if (data.otherParameters) setOtherParameters(data.otherParameters);
      if (data.currentStep) setCurrentStep(data.currentStep);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "mentoringData",
      JSON.stringify({ studentDetails, subjectPerformance, otherParameters, currentStep })
    );
  }, [studentDetails, subjectPerformance, otherParameters, currentStep]);

  const handleStudentDetailsSubmit = (data: StudentDetails) => {
    setStudentDetails(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubjectPerformanceSubmit = (data: SubjectPerformance[]) => {
    setSubjectPerformance(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOtherParametersSubmit = (data: OtherParameters) => {
    setOtherParameters(data);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadPDF = () => {
    if (!studentDetails || !otherParameters) return;

    const reportData: MentoringReport = {
      studentDetails,
      subjectPerformance,
      otherParameters,
    };

    const doc = generatePDF(reportData, logoDataUrl);
    doc.save(`Mentoring_Report_${studentDetails.studentName.replace(/\s+/g, "_")}.pdf`);
    
    toast({
      title: "PDF Generated",
      description: "The mentoring report has been downloaded successfully.",
    });
  };

  const handleEdit = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewEntry = () => {
    setStudentDetails(null);
    setSubjectPerformance([]);
    setOtherParameters(null);
    setCurrentStep(1);
    localStorage.removeItem("mentoringData");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast({
      title: "New Entry",
      description: "Ready to create a new mentoring report.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/navodaya-logo.png" 
              alt="Navodaya Institute of Technology" 
              className="w-12 h-12 object-contain" 
              data-testid="logo-nit" 
            />
            <div>
              <h1 className="text-xl font-semibold">Navodaya Institute of Technology</h1>
              <p className="text-sm text-muted-foreground">Students Mentoring Portal</p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressStepper currentStep={currentStep} steps={STEPS} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <StudentDetailsForm defaultValues={studentDetails || undefined} onSubmit={handleStudentDetailsSubmit} />
          </div>
        )}

        {currentStep === 2 && (
          <SubjectPerformanceForm
            defaultValues={subjectPerformance.length > 0 ? subjectPerformance : undefined}
            onSubmit={handleSubjectPerformanceSubmit}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <OtherParametersForm
              defaultValues={otherParameters || undefined}
              onSubmit={handleOtherParametersSubmit}
              onBack={() => setCurrentStep(2)}
            />
          </div>
        )}

        {currentStep === 4 && studentDetails && otherParameters && (
          <ReportPreview
            data={{
              studentDetails,
              subjectPerformance,
              otherParameters,
            }}
            onDownload={handleDownloadPDF}
            onEdit={handleEdit}
            onNewEntry={handleNewEntry}
          />
        )}
      </main>
    </div>
  );
}
