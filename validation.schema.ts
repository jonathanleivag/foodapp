import * as Yup from 'yup'

export const registerValidation = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es requerido')
})
