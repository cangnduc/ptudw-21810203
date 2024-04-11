#read the file 1.txt and 2.txt and compare the content of the two files
#and print the difference between the two files



def read_file(file_name):
    with open(file_name, 'r') as f:
        return f.readlines()
    
def compare_files(file1, file2):
    file1_lines = read_file(file1)
    file2_lines = read_file(file2)
    for i, line in enumerate(file1_lines):
        if line.strip() != file2_lines[i].strip():
            print(f'Line {i + 1}:')
            print(f'File 1: {line}')
            print(f'File 2: {file2_lines[i]}')
            print("====================================")

if __name__ == '__main__':
    compare_files('1.txt', '2.txt')