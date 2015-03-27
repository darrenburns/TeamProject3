dissertation: dissertation.pdf
	pdflatex -shell-escape dissertation
	bibtex dissertation
	pdflatex -shell-escape dissertation
	pdflatex -shell-escape dissertation

dissertation.pdf: dissertation.tex dissertation.bib
	pdflatex -shell-escape dissertation
	bibtex dissertation
	pdflatex -shell-escape dissertation
	pdflatex -shell-escape dissertation

example.pdf: example.tex example.bib
	pdflatex example
	bibtex example
	pdflatex example
	pdflatex example

clean:
	rm -f *.log *.aux *.toc *.out
	rm -f *.bbl *.blg
	rm -f example.pdf
	
