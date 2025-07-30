# About API cURL Examples

## Prerequisites
1. Get your JWT token by logging in:
```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

2. Replace `YOUR_JWT_TOKEN` in all examples below with the actual token from the login response.

## 1. Create About Entry with Image Upload

```bash
curl -X POST http://localhost:3001/api/admin/about \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=About Numérica" \
  -F "content=Numérica is a leading tax and accounting consulting firm with over 15 years of experience serving businesses and individuals across the region. We specialize in providing comprehensive financial solutions that help our clients achieve their goals while ensuring compliance with all regulatory requirements." \
  -F "mission=To provide exceptional tax and accounting services that empower our clients to make informed financial decisions and achieve their business and personal goals." \
  -F "vision=To be the most trusted financial partner for businesses and individuals, known for our expertise, integrity, and commitment to client success." \
  -F "is_published=true" \
  -F "values_title=Our Core Values & Culture" \
  -F "values_subtitle=The principles that guide our decisions and shape our company culture." \
  -F "collaboration_title=Collaboration" \
  -F "collaboration_description=We believe in the power of teamwork and open communication to deliver exceptional results for our clients." \
  -F "collaboration_link=Learn more" \
  -F "integrity_title=Integrity" \
  -F "integrity_description=We operate with honesty, transparency, and the highest ethical standards in everything we do." \
  -F "integrity_link=Learn more" \
  -F "innovation_title=Innovation" \
  -F "innovation_description=We embrace change and continuously explore new ideas to deliver cutting-edge solutions." \
  -F "innovation_link=Learn more" \
  -F "image=@/path/to/your/image.jpg"
```

## 2. Create About Entry with Image URL

```bash
curl -X POST http://localhost:3001/api/admin/about \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=About Numérica" \
  -F "content=Numérica is a leading tax and accounting consulting firm with over 15 years of experience serving businesses and individuals across the region." \
  -F "image_url=https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800" \
  -F "mission=To provide exceptional tax and accounting services that empower our clients to make informed financial decisions and achieve their business and personal goals." \
  -F "vision=To be the most trusted financial partner for businesses and individuals, known for our expertise, integrity, and commitment to client success." \
  -F "is_published=true"
```

## 3. Get All About Entries

```bash
curl -X GET http://localhost:3001/api/admin/about \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 4. Get Single About Entry

```bash
curl -X GET http://localhost:3001/api/admin/about/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 5. Update About Entry

```bash
curl -X PUT http://localhost:3001/api/admin/about/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Updated About Numérica" \
  -F "collaboration_description=Updated collaboration description with enhanced teamwork focus." \
  -F "is_published=true"
```

## 6. Update About Entry with New Image

```bash
curl -X PUT http://localhost:3001/api/admin/about/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=About Numérica with New Image" \
  -F "image=@/path/to/new/image.jpg"
```

## 7. Delete About Entry

```bash
curl -X DELETE http://localhost:3001/api/admin/about/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 8. Get All Published About Entries (Public)

```bash
curl -X GET http://localhost:3001/api/public/about
```

## 9. Get Single Published About Entry (Public)

```bash
curl -X GET http://localhost:3001/api/public/about/550e8400-e29b-41d4-a716-446655440000
```

## Notes

- Replace `YOUR_JWT_TOKEN` with your actual JWT token
- Replace `550e8400-e29b-41d4-a716-446655440000` with actual about entry ID
- Replace `/path/to/your/image.jpg` with actual image file path
- Supported image formats: jpg, jpeg, png, gif, webp, svg
- Maximum file size: 5MB
- All values fields have default values if not provided 