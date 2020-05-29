#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: forestier
"""

import pandas as pd
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from datetime import datetime


input('test')

brunstatt = 'https://www.coursesu.com/drive-superu-brunstatt'
riedisheim = 'https://www.coursesu.com/drive-superu-riedisheimschumacher'
lingolsheim = 'https://www.coursesu.com/drive-superu-lingolsheim'
pates_riz_puree_chips = 'https://www.coursesu.com/c/epicerie-salee/pates-riz-puree-chips'

def getProducts(store,shelf):
    options = Options()
    options.headless = True
    driver = webdriver.Firefox(options=options)
    # nécessaire pour charger les prix du magasin choisi
    driver.get(store)
    print('Getting '+shelf)
    dfs = []
    for i in range(1,100):
        print('page '+str(i))
        driver.get(shelf+'?page='+str(i))
        
        names = driver.find_elements_by_class_name("name-link")
        lnames = [n.get_attribute('data-copy-title') for n in names]
        
        prices = driver.find_elements_by_xpath("//*[@class='sale-price' or @class='price-not-available']")
        lprices = [p.get_attribute('data-item-price') for p in prices]
        
        df = pd.DataFrame(list(zip(lnames, lprices)),columns =['name', 'price'])
        df['price'] = df['price'].astype('float')

        dfs.append(df)
        if 'Fin de liste' in driver.page_source :
            break

    df = pd.concat(dfs).reset_index(drop='True')
    return df

pates_riz_puree_chips_brunstatt= getProducts(brunstatt, pates_riz_puree_chips)
pates_riz_puree_chips_riedisheim = getProducts(riedisheim, pates_riz_puree_chips)
pates_riz_puree_chips_lingolsheim = getProducts(lingolsheim, pates_riz_puree_chips)

now = datetime.now()
date_time = now.strftime("%m-%d-%Y-%H-%M-%S")

pates_riz_puree_chips_brunstatt.to_csv(date_time+'-pates_riz_puree_chips_brunstatt.csv',index=False)
pates_riz_puree_chips_riedisheim.to_csv(date_time+'-pates_riz_puree_chips_riedisheim.csv',index=False)
pates_riz_puree_chips_lingolsheim.to_csv(date_time+'-pates_riz_puree_chips_lingolsheim.csv',index=False)
