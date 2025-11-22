import React from "react";
import { Stack } from "expo-router";


export default function AcademicoLayout() {
return (
    <Stack screenOptions={{headerShown:false}}>

        <Stack.Screen name="screens" />
    </Stack>
);
}