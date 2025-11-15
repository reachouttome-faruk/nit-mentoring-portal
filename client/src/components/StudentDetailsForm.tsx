import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentDetailsSchema, type StudentDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentDetailsFormProps {
  defaultValues?: StudentDetails;
  onSubmit: (data: StudentDetails) => void;
}

export default function StudentDetailsForm({ defaultValues, onSubmit }: StudentDetailsFormProps) {
  const form = useForm<StudentDetails>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: defaultValues || {
      studentName: "",
      class: "",
      section: "",
      attendanceAsOnDate: "",
      currentCGPA: "",
      mentoringPeriod: "",
      mentorName: "",
      mentorDesignation: "",
      mentorDepartment: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Enter the student's basic details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name" data-testid="input-student-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., B.Tech CSE" data-testid="input-class" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A, B, C" data-testid="input-section" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendanceAsOnDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance as on Date *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 85% (as on 15/11/2025)" data-testid="input-attendance-date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentCGPA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current CGPA *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 8.5" data-testid="input-cgpa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentoringPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentoring Period *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., July 2025 - November 2025" data-testid="input-mentoring-period" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentor Information</CardTitle>
            <CardDescription>Enter the mentor's details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="mentorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentor Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mentor name" data-testid="input-mentor-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentorDesignation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Assistant Professor" data-testid="input-designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentorDepartment"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Department *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Computer Science & Engineering" data-testid="input-department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" data-testid="button-next">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
