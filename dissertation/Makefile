dissertation: dissertation.pdf
	pdflatex dissertation
	bibtex dissertation
	pdflatex dissertation
	pdflatex dissertation

dissertation.pdf: dissertation.tex dissertation.bib
	pdflatex dissertation
	bibtex dissertation
	pdflatex dissertation
	pdflatex dissertation

example.pdf: example.tex example.bib
	pdflatex example
	bibtex example
	pdflatex example
	pdflatex example

clean:
	rm -f *.log *.aux *.toc *.out
	rm -f *.bbl *.blg
	rm -f example.pdf
	
