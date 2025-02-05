@17 // push constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
@17 // push constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // eq
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JEQ__0
D;JEQ
D=1
(JEQ__0)
D=D-1
@SP
A=M
M=D
@SP
M=M+1
@17 // push constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
@16 // push constant 16
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // eq
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JEQ__1
D;JEQ
D=1
(JEQ__1)
D=D-1
@SP
A=M
M=D
@SP
M=M+1
@16 // push constant 16
D=A
@SP
A=M
M=D
@SP
M=M+1
@17 // push constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // eq
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JEQ__2
D;JEQ
D=1
(JEQ__2)
D=D-1
@SP
A=M
M=D
@SP
M=M+1
@892 // push constant 892
D=A
@SP
A=M
M=D
@SP
M=M+1
@891 // push constant 891
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // lt
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JLT_TRUE__3
D;JLT
D=0
@JLT_FALSE__3
0;JMP
(JLT_TRUE__3)
D=-1
(JLT_FALSE__3)
@SP
A=M
M=D
@SP
M=M+1
@891 // push constant 891
D=A
@SP
A=M
M=D
@SP
M=M+1
@892 // push constant 892
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // lt
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JLT_TRUE__4
D;JLT
D=0
@JLT_FALSE__4
0;JMP
(JLT_TRUE__4)
D=-1
(JLT_FALSE__4)
@SP
A=M
M=D
@SP
M=M+1
@891 // push constant 891
D=A
@SP
A=M
M=D
@SP
M=M+1
@891 // push constant 891
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // lt
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JLT_TRUE__5
D;JLT
D=0
@JLT_FALSE__5
0;JMP
(JLT_TRUE__5)
D=-1
(JLT_FALSE__5)
@SP
A=M
M=D
@SP
M=M+1
@32767 // push constant 32767
D=A
@SP
A=M
M=D
@SP
M=M+1
@32766 // push constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // gt
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JGT_TRUE__6
D;JGT
D=0
@JGT_FALSE__6
0;JMP
(JGT_TRUE__6)
D=-1
(JGT_FALSE__6)
@SP
A=M
M=D
@SP
M=M+1
@32766 // push constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@32767 // push constant 32767
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // gt
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JGT_TRUE__7
D;JGT
D=0
@JGT_FALSE__7
0;JMP
(JGT_TRUE__7)
D=-1
(JGT_FALSE__7)
@SP
A=M
M=D
@SP
M=M+1
@32766 // push constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@32766 // push constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // gt
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@JGT_TRUE__8
D;JGT
D=0
@JGT_FALSE__8
0;JMP
(JGT_TRUE__8)
D=-1
(JGT_FALSE__8)
@SP
A=M
M=D
@SP
M=M+1
@57 // push constant 57
D=A
@SP
A=M
M=D
@SP
M=M+1
@31 // push constant 31
D=A
@SP
A=M
M=D
@SP
M=M+1
@53 // push constant 53
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // add
M=M-1
A=M
D=M
A=A-1
M=D+M
@112 // push constant 112
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // sub
M=M-1
A=M
D=M
A=A-1
M=M-D
@SP // neg
A=M
A=A-1
M=-M
@SP // and
AM=M-1
D=M
A=A-1
M=D&M
@82 // push constant 82
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP // or
AM=M-1
D=M
A=A-1
M=D|M
@SP // not
A=M
A=A-1
M=!M
