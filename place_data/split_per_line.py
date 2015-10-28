#!/usr/bin/python

import sys

if len(sys.argv) < 3:
	print 'usage : split_per_line.py input.txt line'
	exit()

fname = sys.argv[1]
num = int(sys.argv[2])
f = open(fname,'r')
content = f.read().split('\n')
f.close()
for i,line in enumerate(content):
	of = open(fname+'.'+str(i/num),'a+')
	of.write(line+'\n')
	of.close()
