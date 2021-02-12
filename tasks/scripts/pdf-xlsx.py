import os
import pyautogui
import subprocess
import time

'''
Mouse click
'''
def mouse_click(x, y):
    pyautogui.click(x, y, button='left', duration=0.5)

'''
Find .pdf file
'''
def find_pdf():
    pdf_dir = 'data/pdf'

    for file in os.listdir(pdf_dir):
        if file.endswith('.pdf'):
            return os.path.join(pdf_dir, file)

'''
Paths
'''
acrobat_path = 'C:/Program Files (x86)/Adobe/Acrobat 2017/Acrobat/Acrobat.exe'
pdf_path = find_pdf()
xlsx_dir = os.path.join(os.getcwd(), 'data/xlsx')

'''
Mouse positions
'''
click_export_pdf = (1765, 417)
choose_spreadsheet = (991, 548)
click_export = (967, 919)
# choose_first_folder = (832, 530)
choose_another_folder = (1240, 846)
click_address_bar = (428, 148)
click_save_dialog = (748, 654)
click_close = (1889, 51)

'''
Automation steps:

1. Open PDF file in Adobe Acrobat.
2. Click 'Export PDF'.
3. Choose 'Spreadsheet'.
4. Click 'Export'.
5. Choose another folder.
6. Click on address bar.
7. Type path to 'xlsx' folder.
8. Keyboard press 'Enter'.
9. Click on 'Save' dialog.
10. Keyboard press 'Enter'.
11. Close Adobe Acrobat.
'''
def automate():
    # Set up a 2.5 second pause after each PyAutoGUI call.
    pyautogui.PAUSE = 2.5

    # Fail-Safe.
    pyautogui.FAILSAFE = True
    print('Moving the mouse to the upper-left corner will abort the program.')

    # Wait a couple seconds.
    time.sleep(2.5)

    # Save running state.
    is_running = True

    try:
        while is_running:
            # 1. Open PDF file in Adobe Acrobat.
            subprocess.Popen([acrobat_path, pdf_path])

            # Wait a couple seconds.
            time.sleep(2.5)

            # 2. Click 'Export PDF'.
            mouse_click(click_export_pdf[0], click_export_pdf[1])

            # 3. Choose 'Spreadsheet'.
            mouse_click(choose_spreadsheet[0], choose_spreadsheet[1])

            # 4. Click 'Export'.
            mouse_click(click_export[0], click_export[1])

            # Wait a couple seconds.
            time.sleep(2.5)

            # 5. Choose another folder.
            mouse_click(choose_another_folder[0], choose_another_folder[1])

            # 6. Click on address bar.
            mouse_click(click_address_bar[0], click_address_bar[1])

            # 7. Type path to 'xlsx' folder.
            pyautogui.typewrite(xlsx_dir)

            # 8. Keyboard press 'Enter'.
            pyautogui.typewrite(['enter'], interval=0.5)

            # 9. Click on 'Save' dialog.
            mouse_click(click_save_dialog[0], click_save_dialog[1])

            # 10. Keyboard press 'Enter'.
            pyautogui.typewrite(['left', 'enter', 'enter'], interval=0.5)

            # Wait a couple seconds.
            time.sleep(5)

            # 11. Close Adobe Acrobat.
            # pyautogui.hotkey('alt', 'f4')
            mouse_click(click_close[0], click_close[1])

            # Steps are finished running.
            is_running = False

    except pyautogui.FailSafeException:
        print('\nAborted.\n')

automate()

# Get and print the mouse coordinates.
# print(pyautogui.position())
