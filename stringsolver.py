import sys
sys.path.insert(1, './PyCube-Solver/')
from cube import Cube
from solver import Solver

def stringmoves(faces):
    lfaces = [[[faces[side * 9 + row * 3 + col] for col in range(3)] for row in range(3)] for side in range(6)]
    cb = Cube(faces=lfaces)
    sol = Solver(cb)
    sol.solveCube(optimize=True)
    if(sol.isSolved()):
        nmoves = sol.getMoves(decorated=True).split("\n")
        moves = ""
        for move in nmoves:
            ind = move.find(":")
            moves += move[ind + 2:]
        return moves
    else:
        return "Invalid configuration"