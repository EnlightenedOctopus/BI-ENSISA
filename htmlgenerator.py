import os
import re

curdir = os.path.dirname(os.path.realpath(__file__))+"/data"

def getFiles():
	files = os.listdir(curdir)
	return files

def cleanname(name):
	newname = "<div class='fullpage inactive'><table class='table-dark' day='"+name.split('-')[1]+"' month='"+name.split('-')[0]+"' year='"+name.split('-')[2]+"' city='"+name.split('-')[4].split('_')[-1].split('.')[0]+"' category='"+" ".join(name.split('-')[4].split("_")[0:-1])+"'>"
	return newname

html = "<html><head><script src='script.js'></script><link rel='stylesheet' type='text/css' href='style.css'><link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'></head><body><div class='tables'>"


files = getFiles()
	

for fname in files:
	file = open(curdir+"/"+fname, "r", encoding='utf-8')
	html += "<h1>"+fname+"</h1>"+cleanname(fname)
	lines = file.readlines()
	i=True
	for line in lines:
		if i:
			html+="<tr><th onclick='sortTable(this,0,false)'>Dénomination produit</th><th onclick='sortTable(this,1)'>Prix</th><th onclick='sortTable(this,2)'>Prix/(L ou Kg)</th></tr>"
			i=False	
		else:
			row=line.split('"')
			row.pop(0)
			if len(row)==2 and row[1].replace(",","").replace("\n",""):
				weight=re.findall("[0-9]+k?g",line)
				if weight and re.findall("k",weight[0]):
					weight=re.findall("[0-9]+",weight[0])[0]+"000"
				else:
					if weight:
						weight=re.findall("[0-9]+",weight[0])[0]
					else:
						weigth = False
				volume=re.findall("[0-9]+m?c?l",line)
				if volume and re.findall("[0-9]+ml",volume[0]):
					volume=str(float(re.findall("[0-9]+",volume[0])[0])/1000)
				elif re.findall("[0-9]+cl",line):
					volume=str(float(re.findall("[0-9]+",volume[0])[0])/100)
				else:
					if volume:
						volume=re.findall("[0-9]+",volume[0])[0]
					else:
						weigth = False

				if weight:
					html += "<tr weight='"+weight+"' onclick='shothprices(this)'>"
				elif volume:
					html += "<tr volume='"+volume+"' onclick='shothprices(this)'>"
				else:
					html += "<tr onclick='shothprices(this)'>"
				isprice=False
				for elem in row:
					if isprice:
						html += "<td>" + elem.replace(",","").replace("\n","") + "</td>"
						price = elem.replace(",","").replace("\n","")

					else:
						html += "<td>" + elem.replace("\n","") + "</td>"
						price = "None"
						isprice=True


				if weight and re.findall("[0-9]+.+[0-9]+",price):
					ratiopw = round(float(price)/float(weight)*1000,2)
					html += "<td>" + str(ratiopw) + "</td>"
				if volume and re.findall("[0-9]+.+[0-9]+",price):
					ratiopw = round(float(price)/float(volume),2)
					html += "<td>" + str(ratiopw) + "</td>"

				html+="</tr>"
	html+="</table></div>"
html+="</div></body></html>"
output = open("index.html", "w", encoding='utf-8')
output.write(html)
output.close()

