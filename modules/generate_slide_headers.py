import re

def generate_slide_headers(text):
    """
    Function to generate slide headers based on the text content.
    Assumes headers are lines in all capital letters followed by a colon.
    """
    slide_headers = []
    lines = text.split("\n")  # Split text into lines

    for line in lines:
        line = line.strip()  # Remove leading and trailing whitespace
        if line.isupper() and re.match(r'^[A-Z\s]+:$', line):  # Check if line is in all capital letters and ends with a colon
            slide_headers.append(line)

    return slide_headers

# Enter the text from which you want to generate slide headers
print("Enter your text below (press Enter twice to finish):")
text_input = []
while True:
    line = input()
    if line:
        text_input.append(line)
    else:
        break

text = '\n'.join(text_input)

# Generate slide headers from the entered text
generated_slide_headers = generate_slide_headers(text)

# Print the generated slide headers
print("\nGenerated Slide Headers:")
for header in generated_slide_headers:
    print(header)
