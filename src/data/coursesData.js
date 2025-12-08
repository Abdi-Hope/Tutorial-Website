const coursesData = {
  "c++": {
    title: "C++ Programming Masterclass",
    chapters: [
      {
        title: "Introduction to C++",
        content: `Welcome to the world of C++ programming! 
        
C++ is a powerful general-purpose programming language that was developed as an extension of the C programming language. 

In this chapter, you'll learn:
• History and evolution of C++
• Basic syntax and structure
• Setting up your development environment
• Writing your first C++ program

C++ gives you low-level access to memory and provides programming constructs that map efficiently to machine instructions.`,
        isFree: true
      },
      {
        title: "Variables and Data Types",
        content: `Understanding variables and data types is fundamental to C++ programming.

In this chapter, we'll cover:
• Primitive data types (int, float, double, char, bool)
• Variable declaration and initialization
• Type modifiers (signed, unsigned, long, short)
• Constants and literals
• Type conversion

Mastering data types will help you write more efficient and error-free code.`,
        isFree: false
      },
      {
        title: "Control Structures",
        content: `Control structures determine the flow of your program's execution.

Topics include:
• Conditional statements (if, else, switch)
• Looping constructs (for, while, do-while)
• Break and continue statements
• Nested control structures

These concepts are essential for creating dynamic and responsive programs.`,
        isFree: false
      }
    ]
  },
  "java": {
    title: "Java Programming Fundamentals",
    chapters: [
      {
        title: "Java Basics and OOP",
        content: `Introduction to Java and Object-Oriented Programming concepts.

Learn about:
• Java platform and JVM
• Basic syntax and structure
• Object-Oriented Principles
• Classes and objects

Java is known for its "write once, run anywhere" capability.`,
        isFree: true
      },
      {
        title: "Java Collections Framework",
        content: `Learn about ArrayList, HashMap, and other collection classes.

Collections covered:
• List implementations
• Set implementations
• Map implementations
• Iterators and streams

The Collections Framework provides ready-made data structures for efficient programming.`,
        isFree: false
      }
    ]
  },
  "python": {
    title: "Python for Beginners",
    chapters: [
      {
        title: "Python Syntax Basics",
        content: `Get started with Python's clean and readable syntax.

Topics include:
• Python interpreter and IDEs
• Basic data types
• Variables and operators
• Input and output

Python is renowned for its simplicity and readability.`,
        isFree: true
      },
      {
        title: "Data Structures",
        content: `Lists, dictionaries, tuples, and sets in Python.

You'll learn:
• List operations and methods
• Dictionary key-value pairs
• Tuple immutability
• Set operations

Python's built-in data structures are powerful and flexible.`,
        isFree: false
      }
    ]
  }
};

// Change from named export to default export
export { coursesData };