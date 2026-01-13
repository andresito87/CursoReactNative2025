import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import { Alert, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNativeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends NativeStackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { login } = useAuthStore(); // almacen del estado de autenticación
    const [isPosting, setIsPosting] = useState(false); // control del estado cuando se realiza la petición de login
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onLogin = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Por favor', 'Introduzca usuario y contraseña');
            return;
        }

        setIsPosting(true);

        try {

            const wasSuccessful = await login(form.email, form.password);
            if (wasSuccessful) return;
            Alert.alert('Error', 'Usuario o contraseña incorrectos');

        } finally {
            setIsPosting(false);
        }
    };

    const { height } = useWindowDimensions();

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                {/* Titles */}
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text
                        category='p2'
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        Por favor, ingrese para continuar
                    </Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={form.email}
                        onChangeText={(email) => setForm({ ...form, email })}
                        accessoryLeft={<MyIcon name='email-outline' />}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        secureTextEntry
                        value={form.password}
                        onChangeText={(password) => setForm({ ...form, password })}
                        accessoryLeft={<MyIcon name='lock' />}
                        style={{ marginBottom: 10 }}
                    />
                </Layout>

                {/* Space */}
                <Layout style={{ height: 10 }} />

                {/* Button */}
                <Layout>
                    <Button
                        disabled={isPosting}
                        accessoryRight={!isPosting ? <MyIcon name="arrow-forward-outline" white /> : undefined}
                        onPress={onLogin}
                        style={{ width: '100%' }}
                    >
                        {isPosting ? <Spinner size="small" status="primary" /> : 'Ingresar'}
                    </Button>
                </Layout>

                {/* Space */}
                <Layout style={{ height: 20 }} />

                {/* Register Option */}
                <Layout
                    style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Text>¿No tienes cuenta?{' '}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        <Text
                            status='primary'
                            category='s1'
                            style={{
                                fontWeight: 'bold',
                                textDecorationLine: 'underline'
                            }}
                        >
                            Crear cuenta aquí
                        </Text>
                    </TouchableOpacity>

                </Layout>

            </ScrollView>
        </Layout>
    );
};