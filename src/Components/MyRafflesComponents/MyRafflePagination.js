import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';

const MyRafflePagination = (props) => {
    const { theme, data, pageNumber, handleOnPress } = props;
    const totalPages = data;
    const pageRange = 3;

    const showLeftButton = pageNumber > 1  && totalPages > pageRange;
    const showRightButton = pageNumber < totalPages  && totalPages > pageRange;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (page) => handleOnPress(page);

    const renderPageNumbers = () => {
        if (totalPages <= pageRange) {
            return pages?.map((page) => (
                <Pressable key={page} style={[styles.paginationNumberContainer, { backgroundColor: pageNumber === page ? '#FFBD0A' : theme.background, borderColor: pageNumber === page ? '#FFBD0A' : theme.color}]} onPress={() => handlePageClick(page)} disabled={page === pageNumber}>
                    <Text style={[styles.paginationNumber, { color: pageNumber === page ? '#000616' : theme.color }]}>
                        {page}
                    </Text>
                </Pressable>
            ));
        } else {
            const startPage = Math.max(1, pageNumber - Math.floor(pageRange / 2));
            const endPage = Math.min(totalPages, startPage + pageRange - 1);
            const displayedPages = pages?.slice(startPage - 1, endPage);

            return (
                <>
                    {startPage > 1 && (
                        <Pressable onPress={() => handlePageClick(1)} style={[styles.paginationNumberContainer, { backgroundColor: theme.background, borderColor: theme.color, },]} >
                            <Text style={[styles.paginationNumber, { color: theme.color }]}>1</Text>
                        </Pressable>
                    )}
                    {startPage > 2 && <Text style={{ color: theme.color }}>...</Text>}
                    {displayedPages.map((page) => (
                        <Pressable key={page} style={[styles.paginationNumberContainer, { backgroundColor: pageNumber === page ? '#FFBD0A' : theme.background, borderColor: pageNumber === page ? '#FFBD0A' : theme.color, },]} onPress={() => handlePageClick(page)} disabled={page === pageNumber}>
                            <Text style={[styles.paginationNumber, { color: pageNumber === page ? '#000616' : theme.color },]}>
                                {page}
                            </Text>
                        </Pressable>
                    ))}
                    {endPage < totalPages - 1 && <Text style={{ color: theme.color }}>...</Text>}
                    {endPage < totalPages && (
                        <Pressable onPress={() => handlePageClick(totalPages)} style={[styles.paginationNumberContainer, { backgroundColor: theme.background, borderColor: theme.color, },]}>
                            <Text style={[styles.paginationNumber, { color: theme.color },]}>{totalPages}</Text>
                        </Pressable>
                    )}
                </>
            );
        }
    };

    return (
        <View style={styles.paginationContainer}>
            {
                showLeftButton &&
                <TouchableOpacity onPress={() => handleOnPress(pageNumber - 1)} disabled={pageNumber === 1} style={styles.navigationButton}>
                    <Feather name={'chevron-left'} size={15} color={theme.color} />
                </TouchableOpacity>
            }

            {renderPageNumbers()}
            {
                showRightButton &&
                <TouchableOpacity onPress={() => handleOnPress(pageNumber + 1)} disabled={pageNumber === totalPages} style={styles.navigationButton}>
                    <Feather name={'chevron-right'} size={15} color={theme.color} />
                </TouchableOpacity>
            }

        </View>
    )
};

export default MyRafflePagination;

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    paginationNumberContainer: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationNumber: {
        fontSize: responsiveFontSize(1.5), 
        fontFamily: 'Gilroy-ExtraBold',
    },
    navigationButton: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFBD0A',
        borderRadius: 4,

    }
});
