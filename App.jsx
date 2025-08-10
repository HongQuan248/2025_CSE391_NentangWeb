import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import studentsData from './data'
import Stats from './components/Stats'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'

export default function App() {
  const [students, setStudents] = useState(studentsData)

  const addStudent = (newStudent) => {
    setStudents(prev => [...prev, newStudent])
  }

  const updateStudent = (id, updatedData) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id 
          ? { ...updatedData, id }
          : student
      )
    )
  }

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id))
  }

  return (
    <div className="container-fluid">
      <div className="header bg-primary text-white p-3 text-center mb-4">
        <h1>Quản lý sinh viên</h1>
      </div>

      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Quản lý sinh viên</Link>
            <div>
              <Link className="btn btn-outline-primary me-2" to="/">Danh sách</Link>
              <Link className="btn btn-primary" to="/add">Thêm sinh viên mới</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Stats students={students} />
                <StudentList 
                  students={students} 
                  onDeleteStudent={deleteStudent}
                />
              </>
            } 
          />
          <Route 
            path="/add" 
            element={
              <StudentForm 
                students={students}
                onAddStudent={addStudent}
                onUpdateStudent={updateStudent}
              />
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <StudentForm 
                students={students}
                onAddStudent={addStudent}
                onUpdateStudent={updateStudent}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  )
}