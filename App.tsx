import {
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import MainNavigation from "./app/navigations/MainNavigation.tsx";


// eslint-disable-next-line @typescript-eslint/no-require-imports
//require("../ReactotronConfig");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {refetchOnWindowFocus: false},
    },
})


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <MainNavigation/>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}


export default App;
