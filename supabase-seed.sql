-- Seed data -- CSE curriculum with short numeric IDs (BIGSERIAL)

INSERT INTO course (id, trimester, course_code, course_name) VALUES
  -- Trimester 1
  (1,  1, 'ENG 1011',  'English - I'),
  (2,  1, 'BDS 1201',  'History of the Emergence of Bangladesh'),
  (3,  1, 'CSE 1110',  'Introduction to Computer Systems'),
  (4,  1, 'MATH 1151', 'Fundamental Calculus'),
  -- Trimester 2
  (5,  2, 'ENG 1013',  'English - II'),
  (6,  2, 'CSE 1111',  'Structured Programming Language'),
  (7,  2, 'CSE 1112',  'Structured Programming Language Laboratory'),
  (8,  2, 'CSE 2213',  'Discrete Mathematics'),
  -- Trimester 3
  (9,  3, 'MATH 2183', 'Calculus and Linear Algebra'),
  (10, 3, 'PHY 2105',  'Physics'),
  (11, 3, 'PHY 2106',  'Physics Laboratory'),
  (12, 3, 'CSE 2215',  'Data Structure and Algorithms - I'),
  (13, 3, 'CSE 2216',  'Data Structure and Algorithms - I Laboratory'),
  -- Trimester 4
  (14, 4, 'MATH 2201', 'Coordinate Geometry and Vector Analysis'),
  (15, 4, 'CSE 1325',  'Digital Logic Design'),
  (16, 4, 'CSE 1326',  'Digital Logic Design Laboratory'),
  (17, 4, 'CSE 1115',  'Object Oriented Programming'),
  (18, 4, 'CSE 1116',  'Object Oriented Programming Lab'),
  -- Trimester 5
  (19, 5, 'MATH 2205', 'Probability and Statistics'),
  (20, 5, 'SOC 2101',  'Society, Environment and Engineering Ethics'),
  (21, 5, 'CSE 2215',  'Data Structure and Algorithms - II'),
  (22, 5, 'CSE 2216',  'Data Structure and Algorithms - II Laboratory'),
  (23, 5, 'EEE 2113',  'Electrical Circuits'),
  -- Trimester 6
  (24, 6, 'CSE 3521',  'Database Management Systems'),
  (25, 6, 'CSE 3522',  'Database Management Systems Lab'),
  (26, 6, 'EEE 2123',  'Electronics'),
  (27, 6, 'EEE 2124',  'Electronics Laboratory'),
  (28, 6, 'CSE 4165',  'Web Programming'),
  -- Trimester 7
  (29, 7, 'CSE 3313',  'Computer Architecture'),
  (30, 7, 'CSE 2118',  'Advanced Object Oriented Programming Lab'),
  (31, 7, 'BIO 3105',  'Biology for Engineers'),
  (32, 7, 'CSE 3411',  'System Analysis and Design'),
  (33, 7, 'CSE 3412',  'System Analysis and Design Laboratory'),
  -- Trimester 8
  (34, 8, 'CSE 4325',  'Microprocessors and Microcontrollers'),
  (35, 8, 'CSE 4326',  'Microprocessors and Microcontrollers Laboratory'),
  (36, 8, 'CSE 3421',  'Software Engineering'),
  (37, 8, 'CSE 3422',  'Software Engineering Laboratory'),
  (38, 8, 'CSE 3811',  'Artificial Intelligence'),
  (39, 8, 'CSE 3812',  'Artificial Intelligence Lab'),
  -- Trimester 9
  (40, 9, 'CSE 2233',  'Theory of Computation'),
  (41, 9, 'GED OPT1', 'General Education Optional - I'),
  (42, 9, 'PMG 4101',  'Project Management'),
  (43, 9, 'CSE 3711',  'Computer Networks'),
  (44, 9, 'CSE 3712',  'Computer Networks Lab'),
  -- Trimester 10
  (45, 10, 'GED OPT2', 'General Education Optional - II'),
  (46, 10, 'CSE 4000A', 'Final Year Design Project - I'),
  (47, 10, 'CSE 4509',  'Operating Systems'),
  (49, 10, 'CSE 4510',  'Operating Systems Laboratory'),
  -- Trimester 11
  (50, 11, 'GED OPT3', 'General Education Optional - III'),
  (51, 11, 'CSE 4000B', 'Final Year Design Project - II'),
  (54, 11, 'CSE 4531',  'Computer Security'),
  -- Trimester 12
  (55, 12, 'CSE 4000C', 'Final Year Design Project - III'),
  (56, 12, 'EEE 4261',  'Green Computing')
ON CONFLICT (id) DO UPDATE
  SET trimester = EXCLUDED.trimester,
      course_code = EXCLUDED.course_code,
      course_name = EXCLUDED.course_name;
