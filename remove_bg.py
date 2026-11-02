from rembg import remove
from PIL import Image

input_path = "client/public/images/profile_original.jpg"
output_path = "client/public/images/profile_nobg.png"

print("Opening image...")
input_image = Image.open(input_path)

print("Removing background with AI model...")
output_image = remove(input_image)

print("Cropping upper body...")
# Crop upper body (bust up):
# The person's face is centered around x=384, y=340
w, h = output_image.size
cropped = output_image.crop((120, 150, 650, 830))

cropped.save(output_path, "PNG")
# Also save as the primary avatar
cropped.save("client/public/images/avatar.png", "PNG")
print(f"Saved to {output_path} and avatar.png successfully! Size: {cropped.size}")
