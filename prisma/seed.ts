import { prisma } from '../lib/prisma.js'

async function main() {
  console.log('🌱 Seeding database...')

  // 👩‍🏫 Teachers (10)
  const teachers = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Teacher ${i + 1}`,
          email: `teacher${i + 1}@academy.com`,
          role: 'TEACHER',
        },
      })
    )
  )

  // 👨‍🎓 Students (100)
  const students = await Promise.all(
    Array.from({ length: 100 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Student ${i + 1}`,
          email: `student${i + 1}@academy.com`,
          role: 'STUDENT',
        },
      })
    )
  )

  // 📚 Courses (20)
  const courses = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.course.create({
        data: {
          title: `Advanced Course ${i + 1}`,
          description: `Comprehensive course on topic ${i + 1} with hands-on projects and real-world applications.`,
          teacherId: teachers[i % teachers.length].id,
        },
      })
    )
  )

  // 📥 Enrollments (each student in 3-5 courses)
  for (const student of students) {
    const numCourses = Math.floor(Math.random() * 3) + 3 // 3-5 courses
    const randomCourses = courses.sort(() => 0.5 - Math.random()).slice(0, numCourses)

    for (const course of randomCourses) {
      await prisma.enrollment.create({
        data: {
          studentId: student.id,
          courseId: course.id,
        },
      })
    }
  }

  // 📅 Lessons (8 per course)
  for (const course of courses) {
    for (let i = 1; i <= 8; i++) {
      await prisma.lesson.create({
        data: {
          title: `Lesson ${i}: ${course.title} Fundamentals`,
          courseId: course.id,
          date: new Date(Date.now() + i * 86400000), // Daily lessons
        },
      })
    }
  }

  // 📝 Assignments (5 per course)
  for (const course of courses) {
    for (let i = 1; i <= 5; i++) {
      await prisma.assignment.create({
        data: {
          title: `Assignment ${i}: ${course.title} Project`,
          courseId: course.id,
          dueDate: new Date(Date.now() + i * 172800000), // Every 2 days
        },
      })
    }
  }

  // 📤 Submissions
  const assignments = await prisma.assignment.findMany()
  for (const student of students) {
    // Each student submits to some assignments
    const studentAssignments = assignments.filter(a =>
      Math.random() > 0.3 // 70% submission rate
    )

    for (const assignment of studentAssignments) {
      await prisma.submission.create({
        data: {
          studentId: student.id,
          assignmentId: assignment.id,
          grade: Math.floor(Math.random() * 100) + 1, // 1-100
        },
      })
    }
  }

  // 💬 Messages (300)
  for (let i = 0; i < 300; i++) {
    const sender = students[Math.floor(Math.random() * students.length)]
    const receiver = Math.random() > 0.5
      ? teachers[Math.floor(Math.random() * teachers.length)]
      : students[Math.floor(Math.random() * students.length)]

    await prisma.message.create({
      data: {
        content: `Message ${i + 1}: ${Math.random() > 0.5 ? 'Question about the course' : 'Great lesson today!'}`,
        senderId: sender.id,
        receiverId: receiver.id,
      },
    })
  }

  // ⭐ Reviews
  for (const course of courses) {
    const enrolledStudents = await prisma.enrollment.findMany({
      where: { courseId: course.id },
      include: { student: true }
    })

    for (const enrollment of enrolledStudents.slice(0, Math.floor(enrolledStudents.length * 0.8))) { // 80% review rate
      await prisma.review.create({
        data: {
          rating: Math.floor(Math.random() * 5) + 1,
          comment: Math.random() > 0.5 ? "Excellent course!" : "Very helpful and well-structured.",
          courseId: course.id,
          studentId: enrollment.studentId,
        },
      })
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created: ${teachers.length} teachers, ${students.length} students, ${courses.length} courses`)
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
