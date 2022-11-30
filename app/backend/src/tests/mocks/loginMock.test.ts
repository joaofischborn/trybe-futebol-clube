const admin = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}

const adminEmailInvalid = {
    email: 'admin@adm',
    password: 'secret_admin'
}

const incorrectUser = {
    email: 'teste@teste.com',
    password: '12345678'
}

const role = {
    role: 'admin'
}

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5ODQ1NDM5fQ.1rHCqiLd1x3dSr5H0QqFZVtbymxxIerc7fQdmGslgY4`

export {admin, adminEmailInvalid, incorrectUser, token, role}